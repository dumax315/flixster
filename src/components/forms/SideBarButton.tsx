import './SideBarButton.css'

interface Props {
    onClick: () => void;
    isOpen: boolean
}

const SideBarButton = ({ onClick, isOpen }: Props) => {

    return (
        <button onClick={onClick} className={'sideBarButton ' + (isOpen?"":"preload")}>
            <img className="sideBarButtonImg" src="/bars-solid.svg" alt="Bars"></img>
        </button>
    )
}

export default SideBarButton
