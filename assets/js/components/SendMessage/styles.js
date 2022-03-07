import colors from '/assets/css/colors.js'

const styles = document.createElement('style')

styles.textContent = `
  .send_message {
    width: 100%;

    padding: 25px;
    margin-top: 25px;

    display: flex;
    justify-content: space-between;
    gap: 20px;

    background-color: #FFF;

    border-radius: 10px;
    box-shadow: 0 0 10px ${colors.lightGray};

    box-sizing: border-box;
    position: relative;
  }

  .send_message__user_image {
    width: 64px;
    height: 64px;
  }

  .send_message__message {
    width: 100%;
    height: 120px;

    padding: 7px 20px;
    
    font-size: 16px;
    font-family: 'Poppins', sans-serif !important;

    border-radius: 6px;
    border: 1px solid ${colors.lightGray};
    outline: none;

    resize: none;

    transition: box-shadow .2s ease;
  }

  .send_message__message:focus {
    box-shadow: 0 0 10px #ebebeb;
  }

  .send_message__button {
    width: 120px;
    height: 50px;

    background-color: ${colors.blue};
    
    color: ${colors.white};
    font-weight: 600;
    
    border-radius: 10px;
    border: none;
    outline: none;

    transition: opacity .12s ease;

    cursor: pointer;
  }

  .send_message__button:hover {
    opacity: .85;
  }
`

export default styles
