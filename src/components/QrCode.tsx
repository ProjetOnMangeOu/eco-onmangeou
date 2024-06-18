import { TbChevronDown } from "react-icons/tb";
import QRCode from "react-qr-code";

const QrCode = (props: { sessionId: string }) => {

    const url = `${window.location.protocol}//${window.location.host}/session?id=${props.sessionId}`;

    return (
        <div className="w-full flex flex-col relative">
            <input type="checkbox" className="peer absolute w-full h-full opacity-0 z-10 m-0 cursor-pointer" />
            <p className="flex justify-between">
                <span>Afficher le Code QR</span>
                <TbChevronDown />
            </p>
            <QRCode className="w-full max-h-0 peer-checked:max-h-96 peer-checked:pt-3 transition-max-height duration-300" value={url} />
        </div>
    );
};

export default QrCode;