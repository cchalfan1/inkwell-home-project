import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {ImageData} from "../../store/types";
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: '100%',
        height: 450,
    },
    modalStyle: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

export default function Images({ data } : { data: Array<ImageData> }) {
    let classes = useStyles(),
        initImg = {
            id: '',
            title: '',
            description: '',
            imageUrl: ''
        },
        [open, togMod] = useState(false),
        [detail, setDetails] = useState<ImageData>(initImg)

    const displayModal = (imgData : ImageData) => {
        togMod(!open)
        setDetails(imgData)
    }

    return <div>
        <ImageList rowHeight={180} cols={5} className={classes.imageList}>
            {data.map((item) => (
                <ImageListItem key={item.id} onClick={() => displayModal(item)}>
                    <img src={item.imageUrl} alt={item.title} />

                    <ImageListItemBar
                        title={item.title}
                        subtitle={<span>by: {item.description}</span>}
                        actionIcon={
                            <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                                <InfoIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>

        <Modal
            open={open}
            onClose={displayModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className={`${classes.paper} ${classes.modalStyle}`}>
                <img src={detail.imageUrl} alt={detail.title} />
                <h2 id="simple-modal-title">{detail.title}</h2>
                <p id="simple-modal-description">
                    {detail.description?.replace(/<br>|<i>|<\/i>/g, " ")}
                </p>
            </div>
        </Modal>
    </div>
}
