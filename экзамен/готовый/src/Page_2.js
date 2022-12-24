import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { UseColorContext, UseContext } from "./Contract/Context";
import pusk from './pusk.gif'

const Page_2 = () => {
    const { color, setColor } = UseColorContext();
    const { web3, Contract } = UseContext();
    const [last_name, last_names] = useState("");
    const [name, names] = useState("");
    const [patronymic, patronymics] = useState("");
    const [password, passwords] = useState("");
    const [password2, passwords2] = useState("");
    const [login, logins] = useState("");
    const [count, count_] = useState("");
    const [number, number_] = useState("");
    const [book, book_] = useState("");
    const [pus, pus_] = useState("true");
    setColor("red");

    async function Registration() {
        if (last_name != "" && name != "" && patronymic != "" && login != "" && password != "" && password2 != "") {
            pus_("false");
            try {
                let FIO = last_name + " " + name + " " + patronymic;
                if (password2 == password) {
                    let addr = await web3.eth.personal.newAccount(password);
                    await web3.eth.personal.unlockAccount("0x732aA77cB86481f942073f7690065ef7A5c95275", "0000");
                    await web3.eth.sendTransaction({ from: "0x732aA77cB86481f942073f7690065ef7A5c95275", to: addr, value: "100000000000000000000" });
                    await web3.eth.personal.unlockAccount(addr, password);
                    await Contract.methods.Registration(FIO, login).send({ from: addr });
                    document.location.href = "http://localhost:3000/Page_1";
                    pus_("true");
                }
                else {
                    pus_("true");
                    alert("ОШИБКА, ПАРОЛЬ НЕ СОВПАДАЕТ!");
                }
            }
            catch {
                pus_("true");
                alert("Ошибкой может послужить: \n 1. Этот логин уже используется.")
            }
        } else { alert("ОШИБКА, УБЕДИТЕСЬ В ТОМ, ЧТО ВСЕ ПОЛЯ ЗАПОЛНЕНЫ!") }
    }

    async function exit(a) {
        if (a == "1") {
            let b = await Contract.methods.LENGHT().call();
            count_(b[3]);
            number_(1);
            book_(await Contract.methods.Book(1).call());
        }
        if (a == "2")
            count_("");
    }

    return (
        <>
            <header className="navbar_three"><Link to="./Page_1"><button className="text">BACK</button></Link>
            <button className="text" onClick={() => setColor(!color)}>
                    DARK MODE
                </button>
                </header><br />

            {pus == "true" && 
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="message" style={{ float: "left", marginLeft: "40px"}}>
                    <p>
                        <div style={{ fontSize: "45px", fontWeight: "bolder" }}><center>Registration</center></div><br />
                        &nbsp;<input className="input" placeholder="surename" type="text" value={last_name} onChange={(e) => last_names(e.target.value)} /><br /><br />
                        &nbsp;<input className="input" placeholder="name" type="text" value={name} onChange={(e) => names(e.target.value)} /><br /><br />
                        &nbsp;<input className="input" placeholder="patrinimyc" type="text" value={patronymic} onChange={(e) => patronymics(e.target.value)} /><br /><br />
                        &nbsp;<input className="input" placeholder="login" type="text" value={login} onChange={(e) => logins(e.target.value)} /><br /><br />
                        &nbsp;<input className="input" placeholder="password" type="password" id="userPassword" value={password} onChange={(e) => passwords(e.target.value)} /><br /><br />
                        &nbsp;<input className="input" placeholder="confirm password" type="password" id="userPassword" value={password2} onChange={(e) => passwords2(e.target.value)} /><br /><br />
                        <Link to="./Page_3"><center><button className="reg" onClick={Registration}>registration</button></center></Link>
                    </p>
                </div>

                {count != "" && <div>
                   
                </div>}</div>}

            {pus == "false" && <div><center><br /><br /><br /><br /><br /><img src={pusk} width="400" alt="" /></center></div>}
        </>
    );
};
export default Page_2;