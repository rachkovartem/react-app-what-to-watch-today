import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import { useAuth0 } from '@auth0/auth0-react';

const style = {
    fontFamily: 'var(--fonts)',
    color: 'var(--white-100)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'var(--grey-400)',
    borderRadius: '12px',
    boxShadow: 24,
    p: 3,
    '& .user-modal': {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gridTemplateRows: '1fr 1fr',
        '& .user-modal__avatar': {
            width: '100%',
            height: '100%',
            borderRadius: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
        },
        '& .user-modal__name-wrapper': {
            pl: 3,
            pt: 1,
            pb: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            '& .user-modal__name': {
                m: 0
            },
            '& .user-modal__email': {
                m: 0
            }
        },
        '& .user-modal__soon': {
            gridArea: '2/1/3/3',
            m: 'auto',
            textAlign: 'center'
        }
    }
};

export default function UserProfile(props) {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const { openModalProfile, setOpenModalProfile } = props;
    return (
        isAuthenticated && user ? <div>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalProfile}
        onClose={() => setOpenModalProfile(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        >
            <Fade in={openModalProfile}>
                <Box sx={style}>
                    <div className="user-modal">
                        <img className="user-modal__avatar" src={user.picture} alt="avatar"/>
                        <div className="user-modal__name-wrapper">
                            <h3 className="user-modal__name">{user.name}</h3>
                            <p className="user-modal__email">{user.email}</p>
                        </div>
                        <div className="user-modal__soon">Скоро здесь появится больше информации о профиле и статистика добавленных фильмов</div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    </div> : null
  );
}