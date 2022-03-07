import colors from '/assets/css/colors.js'

const styles = document.createElement('style')

styles.textContent = `
  .comment {
    width: 100%;

    display: flex;

    padding: 25px;
    margin-top: 25px;

    background-color: #FFF;

    border-radius: 10px;
    box-shadow: 0 0 10px #ebebeb;

    box-sizing: border-box;
    position: relative;
  }

  .vote {
    max-width: fit-content;
    height: 65px;

    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    background-color: ${colors.lightGray};
    border-radius: 10px;
  }

  .vote__plus {
    width: 12px;
    height: 12px;

    cursor: pointer;
  }

  .vote__minus {
    width: 12px;
    height: 5px;

    cursor: pointer;
  }

  .vote__score {
    color: ${colors.blue};
    font-weight: 600;
  }

  .content {
    display: flex;
    flex-direction: column;

    margin-left: 25px;
  }

  .content__about_user {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .user__image {
    width: 45px;
    height: 45px;
  }

  .user__name {
    color: ${colors.darkBlue};
    font-weight: 600;
  }

  .user__created_at {
    color: ${colors.grayishBlue};
  }

  .content__text {
    color: ${colors.grayishBlue};
  }

  .delete {
    display: flex;
    align-items: center;
    gap: 7px;

    position: absolute;
    right: 110px;
    top: 25px;

    color: ${colors.red};
    font-weight: 600;

    cursor: pointer;
  }

  .reply {
    display: flex;
    align-items: center;
    gap: 7px;

    position: absolute;
    right: 25px;
    top: 25px;

    color: ${colors.blue};
    font-weight: 600;

    cursor: pointer;
  }

  .reply__icon {
    height: 14px;
  }
`

export default styles
