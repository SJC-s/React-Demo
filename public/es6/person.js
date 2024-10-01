// == Modules ==
// JavaScript modules allow you to break up your code into separate files.
// This makes it easier to maintain the code-base.
// ES Modules rely on the import and export statements.

// Export
// You can export a function or variable from any file.
// There are two types of exports: Named and Default.

//In-line individually Named export
// export const name = "Jesse"
// export const age = 40

//All at once at the bottom Named export
const name = "Jesse"
const age = 40

export { name, age }

// default export : You can only have one default export in a file.
const message = () => {
    const name = "Jesse";
    const age = 40;
    return name + ' is ' + age + 'years old.';
  };
  
export default message;

