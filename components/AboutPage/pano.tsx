import { ManagedImg } from "../preload/managedImg"
import style from "./styles/pano.module.scss"

const Pano = () => {
    return (
        <div className={style.pano}>
            <img alt="panorama" src={'about/panorama.jpg'}/>
        </div>
    )
}
export default Pano