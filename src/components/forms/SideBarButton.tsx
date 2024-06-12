import './SideBarButton.css'

interface Props {
    onClick: () => void;
}

const SideBarButton = ({ onClick }: Props) => {

    return (
        <button onClick={onClick} className='sideBarButton'>
            <img className="sideBarButtonImg" src="public/bars-solid.svg" alt="Bars"></img>
        </button>

    )
}

export default SideBarButton
