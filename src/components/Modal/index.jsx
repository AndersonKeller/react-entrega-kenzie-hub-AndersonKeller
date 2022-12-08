import { useContext } from "react";
import { TechContext } from "../../context/TechContext";

export function Modal({ id }) {
  const { editTech, user, getUSer, deleteTech } = useContext(TechContext);
  console.log(id);

  return (
    <div className="divBtns">
      <button onClick={(e) => console.log(e.target.id)}>edit</button>
      <button onClick={(e) => deleteTech(id)}>delete</button>
    </div>
  );
}
