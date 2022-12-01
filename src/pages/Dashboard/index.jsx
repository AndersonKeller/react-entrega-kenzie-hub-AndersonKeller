import { Header } from "../../components/Header";

export function Dashboard() {
  function deleteToken() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("user");
  }
  function getUser() {}
  return <Header isButton={true} onclick={deleteToken} text={"Sair"}></Header>;
}
