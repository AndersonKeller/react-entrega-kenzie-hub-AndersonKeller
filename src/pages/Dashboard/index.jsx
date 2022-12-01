import { Header } from "../../components/Header";

export function Dashboard() {
  function deleteToken() {
    window.localStorage.removeItem("token");
  }
  return <Header isButton={true} onclick={deleteToken} text={"Sair"}></Header>;
}
