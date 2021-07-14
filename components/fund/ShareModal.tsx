import { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { TextField } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 15,
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[0],
      padding: theme.spacing(3, 5, 5),
      borderRadius: 5,
      width: 450,
    },
  })
);

type ShareModalType = {
  isOpen: boolean;
  handleClose: () => void;
  link: string;
};

const ShareModal = ({ isOpen, handleClose, link }: ShareModalType) => {
  const classes = useStyles();
  const [successCopy, setSuccessCopy] = useState(false);

  const handleCopy = () => {
    setSuccessCopy(true);
    setTimeout(() => {
      setSuccessCopy(false);
    }, 3000);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 250,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <div className="share__model">
            <div className="share__model__top">
              <h2>Share</h2>
              <img
                src="https://icons-for-free.com/iconfiles/png/512/CLOSE-131994911256789607.png"
                onClick={handleClose}
              />
            </div>
            <div className="share__model__socials">
              <FacebookShareButton className="share__model__social" url={link}>
                <FacebookIcon size={50} round />
              </FacebookShareButton>
              <TwitterShareButton
                className="share__model__social"
                title="Send me Gifts through the Sootchy Gifting App 🎉👇"
                url={link}
              >
                <TwitterIcon size={50} round />
              </TwitterShareButton>
              <WhatsappShareButton className="share__model__social" url={link}>
                <WhatsappIcon size={50} round />
              </WhatsappShareButton>
              <LinkedinShareButton className="share__model__social" url={link}>
                <LinkedinIcon size={50} round />
              </LinkedinShareButton>
              <EmailShareButton className="share__model__social" url={link}>
                <EmailIcon size={50} round />
              </EmailShareButton>
              <TelegramShareButton className="share__model__social" url={link}>
                <TelegramIcon size={50} round />
              </TelegramShareButton>
            </div>
            <div className="share__model__input">
              <TextField
                id="outlined-read-only-input"
                label="Link"
                fullWidth
                value={link}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />

              {successCopy && (
                <p className="share__model__success">
                  Link successfully copied
                </p>
              )}
              <CopyToClipboard text={link}>
                <button
                  className="sootchy-btn-active"
                  color="primary"
                  onClick={handleCopy}
                >
                  Copy link
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
export default ShareModal;
