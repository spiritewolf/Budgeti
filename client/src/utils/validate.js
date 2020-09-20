
export const validate = (username, password, password2, setErrors) => {

  if(!username || !password || !password2){
    setErrors('Please ensure all required fields have been filled in. ');
  }else if(password.length < 8){
    setErrors('Your password must be at least 8 chars long. ');
  }else if(password !== password2){
    setErrors('Please ensure passwords match. ');
  }else {
    setErrors([]);
  }
}
