import {FaCloudUploadAlt, FaDoorClosed} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import UserContext from "./UserContext.js";
import {useContext, useEffect, useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {editItem} from "../utils/api.js";

export default function UserSettingPage() {
    const navigate = useNavigate();
    // 현재 선택된 user 정보를 가져오기
    const {user={}} = useContext(UserContext);
    const [state, setState] = useState({})
    const [profileImage, setProfileImage] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if(user && user.img) {
            // 이미지 초기값 설정
            setProfileImage(`http://localhost:8080/upload/${user.img}`)
            setState(user)
            setMessage(null)
        }
    }, [user])

    const key = "users"
    const {updateUser, status} = useUpdateUser(key)

    // 파일 대화상자 보이기
    function handleIconClick() {
        document.getElementById('fileInput').click()
    }

    // 입력값으로 state 변경하기
    function handleChange(e) {
        setState({...state, [e.target.name]: e.target.value})
    }

    // 파일 선택을 하면 profileImage 상태값 변경하기
    function handleFileChange(e) {
        const file = e.target.files[0]
        if(file && file.type.startsWith("image/")) {
            // img 태그의 src 를 변경, src : URL
            // 선택한 파일객체에 대한 URL 을 생성(파일 업로드는 아니고 미리보기)
            const imageUrl = URL.createObjectURL(file)
            setProfileImage(imageUrl)
            setState({...state, img:file.name})  // 사용자 정보 변경을 위해 파일명 업데이트
            //
            setSelectedFile(file)  // 실제로 파일 업로드를 위한 state
        } else {
            alert('이미지 파일만 선택할 수 있습니다')
            setSelectedFile(null)
        }
    }

    function onSave(item) {
        updateUser(item)
        executeFileUpload()
    }

    // 지금은 데이터 전송을 json-server 로 하는데 이것은 파일업로드를 처리할 수 없으므로 각각 테스트
    // 프로젝트에서는 booking, bookable, user 모두 스프링부트에서 서버를 구현하고,
    // updateUser 에서 다른 값과 함께 formData 를 전송하도록 구현해야 함
    // updateUser mutation 함수가 editItem 이 아니라 executeFileUpload 함수가 되어야 함
    function executeFileUpload () {
        if (!selectedFile) {  // selectedFile : input type="file" 요소 객체
            return;
        }

        // FormData 객체 생성 : 파일 업로드 할 때 필요(여기서는 파일만 보냄, 텍스트도 함께 보낼 수 있음)
        const formData = new FormData();
        formData.append("file", selectedFile);
        // 텍스트 input 이 있으면 formData.append 로 값을 저장(태그 통채로 전달해야 함)

        fetch("http://localhost:8080/reactApp",{
            method: "POST",
            body: formData            // body 가 json 이 아니고  formData
        }).then(
            response => {
                if(response.ok)
                    return response.json()
            }
        ).then(
            data => setMessage(data.message)
        ).catch(error=>{
            console.log(error)
        })
    }



    console.log("handleFileChange state", state)
    return user && (
        <>
            <div className="item user item-form" style={{backgroundColor: "burlywood", paddingTop: "5%"}}>
                {message && <p>{message}</p>}
                <div style={styles.imageContainer}>
                    <img src={profileImage} alt={user?.name} style={styles.profileImage}/>
                    <div style={styles.cameraIcon} onClick={handleIconClick}>
                        📷
                    </div>
                    <input type="file" id="fileInput" style={{display: "none"}} accept="image/*"
                           onChange={handleFileChange}/>
                </div>
                <label>Name</label>
                <p>
                    <input
                        type="text"
                        name="name"
                        value={state?.name}
                        onChange={handleChange}
                    />
                </p>

                <label>Title</label>
                <p>
                    <input
                        type="text"
                        name="title"
                        value={state?.title}
                        onChange={handleChange}
                    />
                </p>
                <label>Notes</label>
                <p>
                      <textarea
                          name="notes"
                          rows={6}
                          cols={30}
                          value={state?.notes}
                          onChange={handleChange}
                      />
                </p>
            </div>
            <p className="controls">
                <button
                    className="btn"
                    onClick={() => navigate(`/users`)}
                >
                    <FaDoorClosed/>
                    <span>Close</span>
                </button>
                <button
                    className="btn"
                    onClick={() => onSave(state)}
                >
                    <FaCloudUploadAlt/>
                    <span>{/*{isNew ? "Add User" : "Update"}*/}Update</span>
                </button>
            </p>
        </>
    )
} // 컴포넌트 끝


// 파일 업로드 formData 객체로 전송해야 함
// 텍스트 값만 업데이트 : -> 실제로 스프링부트에서 구현할 때에는 editItem 이 변경되어야 함
function useUpdateUser (key) {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        item => editItem(`http://localhost:3002/users/${item.id}`, item),
        {
            onSuccess: (user) => {
                queryClient.invalidateQueries(key);
                const users = queryClient.getQueryData(key) || [];
                const userIndex = users.findIndex(b => b.id === user.id);
                users[userIndex] = user;
                queryClient.setQueryData(key, users);
                alert("수정되었습니다")
            }
        }
    );

    return {
        updateUser: mutation.mutate,
        status: mutation.status
    };
}


const styles = {
    imageContainer: {
        position: 'relative',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid #ddd',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    placeholder: {      //이미지가 없을 때
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
        color: '#aaa',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        borderRadius: '50%',
        padding: '5px',
        fontSize: '18px',
    },
};