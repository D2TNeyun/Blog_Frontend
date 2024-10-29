import { useSelector } from "react-redux";
import RingLoader from "react-spinners/RingLoader";

function Loading() {
    const style = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000, // Đảm bảo nó hiển thị trên cùng
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Một lớp mờ để làm nổi bật icon
        borderRadius: "8px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };
    return (
        <div style={style}>
            <RingLoader color="#3DA8DD" />
            <div><b>Loading....</b></div>
        </div>

    )
}

export default Loading;
