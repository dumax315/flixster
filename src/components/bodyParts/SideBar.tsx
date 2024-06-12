import './SideBar.css'

interface Props {
    isOpen: boolean;
}

const SideBar = ({isOpen}:Props) => {

    return (
        <aside className={'sideBar ' + (isOpen?"":"preload")}>
            <h2 className='sideBarTitle'>Liked and Watched movies</h2>
        </aside>

    )
}

export default SideBar
