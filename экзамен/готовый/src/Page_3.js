import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { UseColorContext, UseContext } from "./Contract/Context";
import lupa from './lupa.svg'
import lupa2 from './lupa2.svg'
import pusk from './pusk.gif'

const Page_3 = () => {
    const { color, setColor } = UseColorContext();
    const [w, w_] = useState(color);
    const { web3, Contract } = UseContext();
    const address = sessionStorage.getItem("address");
    const password = sessionStorage.getItem("password");
    const login = sessionStorage.getItem("login");
    const score = sessionStorage.getItem("score");
    const FIO = sessionStorage.getItem("FIO");
    const [mas, mass] = useState(["ACTIONS", "REQUESTS", "USERS", "BOOK OF COMPLAINTS", "THEME"]);
    const [pus, pus_] = useState("");
    const [prosmotr, prosmotr_] = useState("");
    const [name, name_] = useState("");
    const [choice, choice_] = useState("");
    const [polz, polz_] = useState("");
    const [prod, prod_] = useState("");
    const [admin, admin_] = useState("");
    const [mag, mag_] = useState("");
    const [count, count_] = useState("");
    const [count2, count2_] = useState("");
    const [number, number_] = useState(0);
    const [number2, number2_] = useState(0);
    const [book, book_] = useState("");
    const [dei, dei_] = useState("");
    const [trans, trans_] = useState("");
    const [name_mag, name_mag_] = useState("");
    const [city_mag, city_mag_] = useState("");
    const [log_mag, log_mag_] = useState("");
    const [passw_mag, passw_mag_] = useState("");
    const [FIO_mag, FIO_mag_] = useState("");
    const [mess, mess_] = useState("");
    const [messe, messe_] = useState("");
    const [time, time_] = useState("");
    const [hours, hours_] = useState("");
    const [click, click_] = useState("");
    const [click2, click2_] = useState("");
    const [name_mags, name_mags_] = useState([]);
    const [mags, mags_] = useState([]);
    const [rating, rating_] = useState("");
    sessionStorage.setItem("address", address);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("login", login);
    sessionStorage.setItem("score", score);
    sessionStorage.setItem("FIO", FIO);

    //setInterval(() => web3.eth.personal.unlockAccount(address, password), 30000);

    async function list(e) {
        let c = await Contract.methods.LENGHT_SHOP().call();
        if (e.target.value == "USERS") {
            let p = "";
            for (let i = 0; i < c[0]; i++) {
                let b = await Contract.methods.Viewing_SHOP(i).call()
                if (b != "Data deleted")
                    p += b + ", ";
            }
            mag_(p);
            p = "";
            for (let i = 0; i < c[1]; i++) {
                let b = await Contract.methods.Viewing_SELLER(i).call()
                if (b != "Data deleted")
                    p += b + ", ";
            }
            prod_(p);
            p = "";
            for (let i = 0; i < c[2]; i++) {
                let b = await Contract.methods.Viewing_ADMINISTRATOR(i).call()
                if (b != "Data deleted")
                    p += b + ", ";
            }
            admin_(p);
            p = "";
            polz_("USERS");
        }

        if (e.target.value == "COMPLAINT BOOK") {
            let b = await Contract.methods.LENGHT().call({ from: address });
            count_(b[3]);
            number_(1);
            book_(await Contract.methods.Book(1).call());
        }

        if (e.target.value == "ACTIONS") {
            dei_("ACTIONS");
        }

        if (e.target.value == "REQUESTS") {
            messe_("REQUESTS");
            let b = await Contract.methods.LENGHT().call();
            count2_(b[1]);
            if (b[1] != 0) {
                number2_(1);
                let m = await Contract.methods.Viewing_MESSAGES(0).call()
                if (m[2] == 1)
                    m[2] = "Request for a promotion";
                if (m[2] == 2)
                    m[2] = "Request for demotion";
                mess_(m);
                var d = new Date(m[4] * 1000),
                    yyyy = d.getFullYear(),
                    mm = ("0" + (d.getMonth() + 1)).slice(-2),
                    dd = ("0" + d.getDate()).slice(-2),
                    hh = d.getHours(),
                    h = hh,
                    min = ("0" + d.getMinutes()).slice(-2);
                hours_(h + ":" + min);
                time_(dd + "." + mm + "." + yyyy + " г.");
            }
        }

        if (e.target.value == "THEME") {
            setColor(!w);
            w_(!w);
        }
        e.target.value = "";
    }

    async function exit(a) {
        if (a == "count")
            count_("");
        if (a == "dei") {
            name_mag_(""); city_mag_(""); log_mag_(""); passw_mag_("");
            dei_("");
        }
        if (a == "pus")
            pus_("");
        if (a == "polz")
            polz_("");
        if (a == "messe")
            messe_("");
        if (a == "reg" || a == "delete" || a == "peremen") {
            click_(a);
            name_mag_(""); city_mag_(""); log_mag_(""); passw_mag_(""); FIO_mag_("");
            trans_(a);
            let c = await Contract.methods.LENGHT_SHOP().call();
            let p = [];
            let d = 0;
            for (let i = 0; i < c[0]; i++) {
                let b = await Contract.methods.Viewing_SHOP(i).call()
                if (b != "Data deleted") {
                    p[d] = b;
                    d++;
                }
            }
            name_mags_(p);
        }
    }

    async function lit(e) {
        mags_(e.target.value);
    }

    async function search() {
        click2_(1);
        if (name != "") {
            pus_("false");
            try {
                prosmotr_(await Contract.methods.Users(name).call());
                choice_("full name")
            }
            catch {
                try {
                    let a = await Contract.methods.Shops(name).call();
                    let b = a[3];
                    let c = "";
                    for (let i = 0; i < a[5]; i++) {
                        if (b[i] != "Data deleted")
                            c += b[i] + ",";
                    }
                    a[3] = c;
                    prosmotr_(a);
                    try {
                        rating_(await Contract.methods.Rating(name).call() / 100)
                    } catch { rating_("NaN"); }
                    choice_("title");
                }
                catch {
                    choice_("error");
                }
            }
            pus_("true");
        }
        else alert("ERROR, MAKE SURE THAT ALL THE FIELDS ARE FILLED IN!");
        click2_("");
    }

    async function KNIGA_ZHALOB(b) {
        if (b == "yes") {
            let a = number + 1;
            if (a <= count) {
                book_(await Contract.methods.Book(a).call());
                number_(a);
            }
        }
        if (b == "no") {
            let a = number - 1;
            if (a > 0) {
                book_(await Contract.methods.Book(a).call());
                number_(a);
            }
        }
    }

    async function SHOP(a) {
        name_mag_(""); city_mag_(""); log_mag_(""); passw_mag_("");
        if (a == "add") {
            trans_("prog");
            try {
                if (name_mag != "" && city_mag != "" && log_mag != "" && passw_mag != "") {
                    let addr = await web3.eth.personal.newAccount(passw_mag);
                    await web3.eth.personal.unlockAccount("0x732aA77cB86481f942073f7690065ef7A5c95275", "0000");
                    await web3.eth.sendTransaction({ from: "0x732aA77cB86481f942073f7690065ef7A5c95275", to: addr, value: "1000000000000000000000" });
                    await web3.eth.personal.unlockAccount(addr, passw_mag);
                    await Contract.methods.Registration_SHOP(name_mag, city_mag, log_mag, addr).send({ from: address });
                    let c = await Contract.methods.LENGHT_SHOP().call();
                    let p = "";
                    for (let i = 0; i < c[0]; i++) {
                        let b = await Contract.methods.Viewing_SHOP(i).call()
                        if (b != "Data deleted")
                            p += b + ", ";
                    }
                    mag_(p);
                    p = "";
                    trans_(""); name_mag_(""); city_mag_(""); log_mag_(""); passw_mag_("");click_("");
                }
                else {
                    name_mag_(""); city_mag_(""); log_mag_(""); passw_mag_("");
                    alert("ERROR, MAKE SURE THAT ALL THE FIELDS ARE FILLED IN!");
                    trans_("reg");
                }
            }
            catch {
                name_mag_(""); city_mag_(""); log_mag_(""); passw_mag_("");
                alert("The error may be: \n 1. This username is already in use.");
                trans_("reg");
            }
        }

        if (a == "delete") {
            trans_("prog");
            try {
                if (mags != "") {
                    await Contract.methods.Delete_SHOP(mags).send({ from: address });
                    let c = await Contract.methods.LENGHT_SHOP().call();
                    let p = "";
                    for (let i = 0; i < c[0]; i++) {
                        let b = await Contract.methods.Viewing_SHOP(i).call()
                        if (b != "Data deleted")
                            p += b + ", ";
                    }
                    mag_(p);
                    p = "";
                    for (let i = 0; i < c[1]; i++) {
                        let b = await Contract.methods.Viewing_SELLER(i).call()
                        if (b != "Data deleted")
                            p += b + ", ";
                    }
                    prod_(p);
                    p = "";
                    let z = [];
                    let d = 0;
                    for (let i = 0; i < c[0]; i++) {
                        let b = await Contract.methods.Viewing_SHOP(i).call()
                        if (b != "Data deleted") {
                            z[d] = b;
                            d++;
                        }
                    }
                    name_mags_(z);click_("");
                } else {
                    alert("ERROR, MAKE SURE THAT ALL THE FIELDS ARE FILLED IN!");
                    trans_("delete");
                }
            }
            catch {
                alert("An error may be: \n 1. The specified name is incorrect.");
                trans_("delete");
            }
            trans_("");
        }
    }

    async function Raising_Downgrades(a) {
        try {
            trans_("prog");

            if (FIO_mag != "") {
                await Contract.methods.Raising_Downgrades(FIO_mag, a, name_mag).send({ from: address });
                name_mag_(""); FIO_mag_("");
                let c = await Contract.methods.LENGHT_SHOP().call();
                let p = "";
                for (let i = 0; i < c[0]; i++) {
                    let b = await Contract.methods.Viewing_SHOP(i).call()
                    if (b != "Data deleted")
                        p += b + ", ";
                }
                mag_(p);
                p = "";
                for (let i = 0; i < c[1]; i++) {
                    let b = await Contract.methods.Viewing_SELLER(i).call()
                    if (b != "Data deleted")
                        p += b + ", ";
                }
                prod_(p);
                p = "";
                for (let i = 0; i < c[2]; i++) {
                    let b = await Contract.methods.Viewing_ADMINISTRATOR(i).call()
                    if (b != "Data deleted")
                        p += b + ", ";
                }
                admin_(p);
                p = "";
                trans_("");click_("");
                if (messe != "")
                    mess_(await Contract.methods.Viewing_MESSAGES(number2-1).call())
            }
            else {
                name_mag_(""); FIO_mag_("");
                alert("ERROR, MAKE SURE THAT ALL THE FIELDS ARE FILLED IN!");
                trans_("peremen");
            }
        } catch {
            name_mag_(""); FIO_mag_("");
            alert("An error can be: \n 1. The name specified incorrectly \n 1. The user's full name specified incorrectly.");
            trans_("peremen");
        }
    }

    async function Viewing_MESSAGES(b) {
        if (b == "+") {
            if ((number2 + 1) <= count2) {
                number2_(number2 + 1);
                let m = await Contract.methods.Viewing_MESSAGES(number2).call()
                if (m[2] == 1)
                    m[2] = "Request for a promotion";
                if (m[2] == 2)
                    m[2] = "Request for demotion";
                mess_(m);
                var d = new Date(m[4] * 1000),
                    yyyy = d.getFullYear(),
                    mm = ("0" + (d.getMonth() + 1)).slice(-2),
                    dd = ("0" + d.getDate()).slice(-2),
                    hh = d.getHours(),
                    h = hh,
                    min = ("0" + d.getMinutes()).slice(-2);
                hours_(h + ":" + min);
                time_(dd + "." + mm + "." + yyyy + " г.");
            }
        }
        if (b == "-") {
            let a = number2 - 1;
            if (a > 0) {
                number2_(a);
                a--;
                let m = await Contract.methods.Viewing_MESSAGES(a).call()
                if (m[2] == 1)
                    m[2] = "Request for a promotion";
                if (m[2] == 2)
                    m[2] = "Request for demotion";
                mess_(m);
                var d = new Date(m[4] * 1000),
                    yyyy = d.getFullYear(),
                    mm = ("0" + (d.getMonth() + 1)).slice(-2),
                    dd = ("0" + d.getDate()).slice(-2),
                    hh = d.getHours(),
                    h = hh,
                    min = ("0" + d.getMinutes()).slice(-2);
                hours_(h + ":" + min);
                time_(dd + "." + mm + "." + yyyy + " г.");
            }
        }
    }

    return (
        <>
            <header className="navbar_two">
                <select className="text" onChange={list}>
                    <option value='' hidden>OPTIONS</option>
                    {mas.map((arr, i) => <option key={i} value={String(arr)}>
                        {arr}
                    </option>)}</select>
                <div>
                    <input className="input_two" type="text" placeholder="&emsp;search" value={name} onChange={(e) => name_(e.target.value)} />
                    {click2 != 1 &&<button className="text" onClick={search} > <img src={lupa} width="30" alt="" /></button>}
                    {click2 == 1 &&<button className="text"> <img src={lupa2} width="30" alt="" /></button>}</div>
                <Link to="./Page_1"><button className="text">EXIT</button></Link>
            </header>
            <br />

            <div style={{ float: "left", marginLeft: "40px" }}>
                <div className="message_two5" >
                    <div style={{ float: "right", marginRight: "20px" }}><Link to="./Page_5"><button className="text_three">BUYER</button></Link></div><br /><br />
                    <div style={{ fontSize: "45px", fontWeight: "bolder" }}><center>ADMINISTRATOR'S PERSONAL PAGE</center></div><br />
                    &nbsp;Full name:&nbsp;{FIO}<br />
                    &nbsp;Login:&nbsp;{login}<br />
                    &nbsp;Current balance:&nbsp;{Math.round(parseFloat(score) * 100) / 100}<br /><br />
                </div><br />

                {pus == "false" && (<div className="message_two" >
                    <div style={{ float: "right", marginRight: "20px" }}><button className="text_two" onClick={() => exit("pus")}>&#10006;</button></div><br />
                    <div style={{ backgroundColor: "#ffffff" }}><br /><br />
                        <center><img src={pusk} width="200" alt="" /></center><br /><br /></div></div>)}
                {pus == "true" && choice == "error" && (<div className="message_two" >
                    <div style={{ float: "right", marginRight: "20px" }}><button className="text_two" onClick={() => exit("pus")}>&#10006;</button></div><br />
                    <div style={{ backgroundColor: "#ffffff" }}><br /><br /><br />
                        <center>ERROR</center><br /><br /><br /></div></div>)}
                {pus == "true" && choice == "full name" && (<div className="message_two" >
                    <div style={{ float: "right", marginRight: "20px" }}><button className="text_two" onClick={() => exit("pus")}>&#10006;</button></div><br />
                    <div style={{ backgroundColor: "#ffffff" }}>
                        &nbsp;Full name: &nbsp;{prosmotr[0]}<br />
                        &nbsp;Login: &nbsp;{prosmotr[1]}<br />
                        {prosmotr[2] == 1 && <div>&nbsp;Role: &nbsp;Administrator</div>}
                        {prosmotr[2] == 2 && <div>&nbsp;Role: &nbsp;Seller</div>}
                        {prosmotr[2] == 3 && <div>&nbsp;Role: &nbsp;Buyer</div>}
                        {prosmotr[2] == 4 && <div>&nbsp;Role: &nbsp;Shop</div>}
                        {prosmotr[2] == 5 && <div>&nbsp;Role: &nbsp;Bank</div>}
                        {prosmotr[2] == 6 && <div>&nbsp;Role: &nbsp;The supplier</div>}
                        {prosmotr[2] == 2 && <div>
                            &nbsp;Shop: &nbsp;{prosmotr[3]}</div>}</div>
                </div>)}
                {pus == "true" && choice == "title" && (<div className="message_two" >
                    <div style={{ float: "right", marginRight: "20px" }}><button className="text_two" onClick={() => exit("pus")}>&#10006;</button></div><br />
                    <div style={{ backgroundColor: "#ffffff" }}>
                        &nbsp;Title: &nbsp;{prosmotr[0]}<br />
                        &nbsp;Login: &nbsp;{prosmotr[1]}<br />
                        &nbsp;City: &nbsp;{prosmotr[2]}<nr />
                        {rating != "NaN" && <div>&nbsp;Rating:&nbsp;{Math.round(parseFloat(rating) * 100) / 100}<br /></div>}
                        {prosmotr[3] != "" && <div className="message_nine">
                            &nbsp;Sellers: &nbsp;{prosmotr[3]}</div>}
                        {prosmotr[3] != "" && <div>
                            &nbsp;Number of sellers: &nbsp;{prosmotr[4]}</div>}</div>
                </div>)}
            </div>

            {dei == "ACTIONS" && <div className="mes_but" style={{ float: "right", marginRight: "40px" }}>
                <button style={{ float: "right", marginRight: "20px" }} className="text_two" onClick={() => exit("dei")}>&#10006;</button>
                <div style={{ float: "right" }}><br />
                    {click != "reg" && <button className="button2" onClick={() => exit("reg")}>ADD A STORE</button>}
                    {click == "reg" && <button className="buttone" >ADD A STORE</button>}<br />
                    {click != "delete" && <button className="button2" onClick={() => exit("delete")}>DELETE A STORE</button>}
                    {click == "delete" && <button className="buttone" >DELETE A STORE</button>}<br />
                    {click != "peremen" && <button className="button2" onClick={() => exit("peremen")}>CHANGE ROLES</button>}
                    {click == "peremen" && <button className="buttone" >CHANGE ROLES</button>}</div>

                {trans == "reg" && <div style={{ float: "left", marginLeft: "100px" }}>
                    <br />
                    <input className="input" type="text" placeholder="STORE NAME" value={name_mag} onChange={(e) => name_mag_(e.target.value)}></input><br />
                    <br />
                    <input className="input" type="text" placeholder="CITY" value={city_mag} onChange={(e) => city_mag_(e.target.value)}></input><br />
                    <br />
                    <input className="input" type="text" placeholder="LOGIN" value={log_mag} onChange={(e) => log_mag_(e.target.value)}></input><br />
                    <br />
                    <input className="input" type="text" placeholder="PASSWORD" value={passw_mag} onChange={(e) => passw_mag_(e.target.value)}></input><br />
                    <button className="button3" onClick={() => SHOP("add")}>ADD</button></div>}
                {trans == "delete" && <div style={{ float: "left", marginLeft: "100px" }}><br /><br /><br />
                    &nbsp;<select className="text_two2" onChange={lit}>
                        <option value='' hidden>STORE NAME</option>
                        {name_mags.map((arr, i) => <option key={i} value={String(arr)}>
                            {arr}
                        </option>)}</select><br />
                    <button className="button3" onClick={() => SHOP("delete")}>DELETE</button>
                </div>}
                {trans == "peremen" && <div style={{ float: "left", marginLeft: "100px" }}><br />
                    <input className="input" placeholder="FULL NAME" type="text" value={FIO_mag} onChange={(e) => FIO_mag_(e.target.value)}></input><br />
                    <br />
                    <input className="input" type="text" placeholder="STORE NAME" value={name_mag} onChange={(e) => name_mag_(e.target.value)}></input><br /><br />
                    <button className="button3" onClick={() => Raising_Downgrades(0)}>INCREASE</button><br />
                    <button className="button3" onClick={() => Raising_Downgrades(1)}>DOWNGRADE</button>
                </div>}
                {trans == "prog" && <div style={{ float: "left", marginLeft: "200px" }}><center><br /><br /><br /><img src={pusk} width="200" alt="" /></center></div>}
            </div>}

            {messe == "REQUESTS" && <div>
                {dei == "ACTIONS" && <div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>}
                <div style={{ float: "right", marginRight: "30px", fontSize: "10px", fontWeight: "bolder" }}>{number2 < count2 && (<button className="text_two" onClick={() => Viewing_MESSAGES("+")}>&#9650;</button>)}
                    {number2 == count2 && (<button className="text_two4">&#9650;</button>
                    )}
                    <br /> {number2 > 1 && (<button className="text_two" onClick={() => Viewing_MESSAGES("-")}>&#9660;</button>)}
                    {number2 == 1 && (<button className="text_two4">&#9660;</button>
                    )}
                    {count2 == 0 && (<button className="text_two4">&#9660;</button>
                    )}<br /></div>
                <div style={{ float: "right", display: "flex" }}>
                    {count2 != 0 && <div className="message_six" style={{ marginRight: "10px", fontSize: "20px", fontWeight: "bolder" }}><div style={{ float: "right" }}>{number2}</div></div>}
                    <div className="message_two2">
                        <div style={{ float: "right", marginRight: "20px" }}><button className="text_two" onClick={() => exit("messe")}>&#10006;</button></div>
                        {count2 != 0 && <div style={{ backgroundColor: "#ffffff" }}>
                            &nbsp;Full name: &nbsp;{mess[0]}<br />
                            {mess[1] == 1 && <div>&nbsp;Role:&nbsp;Administrator</div>}
                            {mess[1] == 2 && <div>&nbsp;Role:&nbsp;Seller</div>}
                            {mess[1] == 3 && <div>&nbsp;Role:&nbsp;Buyer</div>}
                            {mess[1] == 4 && <div>&nbsp;Role:&nbsp;Shop</div>}
                            {mess[1] == 5 && <div>&nbsp;Role:&nbsp;Bank</div>}
                            {mess[1] == 6 && <div>&nbsp;Role:&nbsp;The supplier</div>}
                            &nbsp;{mess[2]}<br />
                            {mess[3] == 1 && <div style={{ color: "#B22222" }}> &nbsp;Waiting for a response<br /></div>}
                            {mess[3] == 2 && <div style={{ color: "#32CD32" }}> &nbsp;The response has been sent<br /></div>}
                            &nbsp;{time}<br />
                            &nbsp;{hours}<br /></div>}
                        &emsp;Total: {count2}</div></div>
            </div>}

            {polz == "USERS" && <div>
                {dei == "ACTIONS" && messe == "" && <div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>}
                {(messe == "REQUESTS") && <div><br /><br /><br /><br /><br /><br /><br /></div>}
                <div style={{ float: "right", marginRight: "60px" }}><button className="text_two" onClick={() => exit("polz")}>&#10006;</button></div><br />
                <div className="flex" style={{ float: "right", marginRight: "100px" }}>
                    <div className="message_foo_3" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Sellers</center></div>
                    <div className="message_foo_3" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Administrators</center></div>
                    <div className="message_foo_3" style={{ fontSize: "20px", fontWeight: "bolder" }}><center>The shops</center></div>
                </div>
                <div className="flex" style={{ float: "right", marginRight: "100px" }}>
                    <div className="message_foo_2" style={{ marginRight: "1px", fontSize: "20px" }}><center>{prod}</center></div>
                    <div className="message_foo_2" style={{ marginRight: "1px", fontSize: "20px" }}><center>{admin}</center></div>
                    <div className="message_foo_2" style={{ fontSize: "20px" }}><center>{mag}</center></div>
                </div>
                {count == "" && <div style={{ float: "right" }}><br /><br /><br /><br /><br /><br /></div>}
            </div>}

            {count != "" && <div>
                {dei == "ACTIONS" && polz == "" && messe == "" && <div><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>}
                {polz == "USERS" && messe == "" && <div><br /><br /><br /><br /><br /></div>}
                {polz == "USERS" && (messe == "REQUESTS") && <div><br /><br /><br /><br /><br /></div>}
                {(messe == "REQUESTS") && polz == "" && <div><br /><br /><br /><br /><br /><br /><br /></div>}

                <div style={{ float: "right", marginRight: "60px" }}><button className="text_two" onClick={() => exit("count")}>&#10006;</button></div><br />
                <div style={{ float: "right", marginRight: "30px", fontSize: "10px", fontWeight: "bolder" }}>{number < count && (<button className="text_two" onClick={() => KNIGA_ZHALOB("yes")}>&#9650;</button>)}{number == count && (<button className="text_two4">&#9650;</button>
                )}
                    <br /> {number > 1 && (<button className="text_two" onClick={() => KNIGA_ZHALOB("no")}>&#9660;</button>)}
                    {number == 1 && (<button className="text_two4">&#9660;</button>
                    )} </div>
                <div style={{ float: "right", display: "flex", justifyContent: "center" }}>
                    <div className="message_three" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Shop</center></div>
                    {book[2] != "" && book[1] == "" && <div className="message_three" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Response to a comment</center></div>}
                    {book[1] != "" && book[2] == "" && <div className="message_three" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Top-level comment</center></div>}
                    {book == "" && <div className="message_three" style={{ float: "right", marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Comment / Response</center></div>}
                    <div className="message_three" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Who left a comment</center></div>
                    <div className="message_three" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Оценка (по 10-бальной)</center></div>
                    <div className="message_three" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Number of "+"</center></div>
                    <div className="message_three" style={{ marginRight: "30px", fontSize: "20px", fontWeight: "bolder" }}><center>Number of "-"</center></div> <br /><br />
                </div>
                {number != 0 && <div style={{ float: "right", display: "flex", justifyContent: "center" }}>
                    <div className="message_six" style={{ marginRight: "10px", fontSize: "20px", fontWeight: "bolder" }}><div style={{ float: "right" }}>{number}</div></div>
                    <div className="message_foo" style={{ float: "right", marginRight: "1px", fontSize: "20px" }}><center>{book[0]}</center></div>
                    {book[1] != "" && book[2] == "" && <div className="message_foo" style={{ marginRight: "1px", fontSize: "20px" }}><center>{book[1]}</center></div>}
                    {book[2] != "" && book[1] == "" && <div className="message_foo" style={{ marginRight: "1px", fontSize: "20px" }}><center>{book[2]}</center></div>}
                    <div className="message_foo" style={{ marginRight: "1px", fontSize: "20px", justifyContent: "center" }}><center>{book[3]}</center></div>
                    <div className="message_foo" style={{ marginRight: "1px", fontSize: "20px" }}><center>{book[4]}</center></div>
                    <div className="message_foo" style={{ marginRight: "1px", fontSize: "20px" }}><center>{book[5]}</center></div>
                    <div className="message_foo" style={{ marginRight: "97px", fontSize: "20px" }}><center>{book[6]}</center></div>
                </div>}
                <div className="message_five" style={{ float: "right", marginRight: "97px", fontSize: "20px" }}>&emsp;Всего: {count}</div>

                <div style={{ float: "right" }}><br /><br /><br /></div>
            </div>}
        </>
    );
};
export default Page_3;