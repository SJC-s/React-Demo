import {FaCloudUploadAlt, FaDoorClosed} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import UserContext from "./UserContext.js";
import {useContext, useEffect, useState} from "react";

export default function UserSettingPage() {
    const navigate = useNavigate();
    // 현재 선택된 user 정보를 가져오기
    const {user} = useContext(UserContext);
    const [state, setState] = useState()
    const [profileImage, setProfileImage] = useState()

    useEffect(() => {
        if(user) {
            // 이미지 초기값 설정
            setProfileImage(`http://localhost:8080/upload/${user.img}`)
            setState(user)
        }
    }, [user])

    // 파일 대화상자 보이기
    function handleIconClick() {
        document.getElementById('fileInput').click()
    }

    function handleChange() {

    }

    function handleFileChange() {

    }

    function onSave(item) {

    }

    return (
        <>
            <div className="item user item-form" style={{backgroundColor: "burlywood", paddingTop: "5%"}}>
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
                    className="btn "
                    onClick={() => navigate(`/users?id=${user.id}`)}
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