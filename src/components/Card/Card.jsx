import React from "react";
import "./Card.css";
import { FaRegCircle } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BiAdjust, BiLoader } from "react-icons/bi";
import { BsCheckCircleFill, BsFillExclamationSquareFill } from "react-icons/bs";

const Card = ({ id, title, tag, status, priority }) => {
  const isStatus = localStorage.getItem("group") === "status";
  const isPriority = localStorage.getItem("group") === "priority";
  const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done'];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Backlog":
        return <BiLoader style={{ fontSize: "16px" }} />;
      case "Todo":
        return <FaRegCircle style={{ fontSize: "15px", color: "#ddeded" }} />;
      case "In progress":
        return <BiAdjust style={{ fontSize: "16px", color: "#f2d750" }} />;
      case "Done":
        return <BsCheckCircleFill style={{ fontSize: "16px" }} />;
      default:
        return <IoMdCloseCircleOutline style={{ fontSize: "16px" }} />;
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 1 || priority === 2 || priority === 3) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-signal"
          viewBox="0 0 16 16"
        >
          <rect x="1" y="10" width="3" height="2" />
          <rect
            x="5"
            y="7"
            width="3"
            height="5"
            opacity={priority === 2 || priority === 3 ? 1 : 0.25}
          />
          <rect
            x="9"
            y="4"
            width="3"
            height="8"
            opacity={priority === 3 ? 1 : 0.25}
          />
        </svg>
      );
    } else if (priority === 4) {
      return <BsFillExclamationSquareFill style={{ fontSize: "16px" }} />;
    }
    return <p>...</p>;
  };

  return (
    <div className="cardContainer flex-gap-10" style={{ gap: "10px", padding: "12px" }}>
      <div className="cardHeading flex-sb">
        <span style={{ textTransform: "uppercase", fontWeight: "600", fontSize: "var(--font-size-small)" }} className="color-grey">
          {id}
        </span>
        <div
          className="imageContainer relative"
          style={{ width: "24px", height: "24px", flexShrink: 0 }}
        >
          <img
            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
            src="https://img.freepik.com/premium-photo/elevate-your-brand-with-friendly-avatar-that-reflects-professionalism-ideal-sales-managers_1283595-18531.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726704000&semt=ais"
            alt="UserImage"
          />
          <div className="showStatus" style={{ width: "8px", height: "8px", backgroundColor: "#22c55e", borderRadius: "50%", position: "absolute", bottom: "0", right: "0", border: "1px solid white" }}></div>
        </div>
      </div>
      <div className="cardTitle" style={{ fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }}>
        {!isStatus && getStatusIcon(status)}
        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{title}</span>
      </div>
      <div className="cardTags" style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {!isPriority && (
          <div className="tags color-grey" style={{ flexShrink: 0 }}>
            {getPriorityIcon(priority)}
          </div>
        )}
        {tag?.map((element, index) => {
          return (
            <div key={index} className="tags color-grey" style={{ display: "flex", alignItems: "center", gap: "2px", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: "16px", lineHeight: "0" }}>•</span> {element}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
