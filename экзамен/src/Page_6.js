import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { UseColorContext, UseContext } from "./Contract/Context";
import lupa from './lupa.svg'
import pusk from './pusk.gif'

const Page_6 = () => {
    const { color, setColor } = UseColorContext();
    const [w, w_] = useState(color);
    const { web3, Contract } = UseContext();
    const address = sessionStorage.getItem("address");
    const password = sessionStorage.getItem("password");
    const login = sessionStorage.getItem("login");
    const score = sessionStorage.getItem("score");
    const FIO = sessionStorage.getItem("FIO");
    const role = sessionStorage.getItem("role");
    const city = sessionStorage.getItem("city");
    const rating = sessionStorage.getItem("rating");
    const [mas, mass] = useState(["ACTIONS", "THEME"]);
    const [count2, count2_] = useState("");
    const [number2, number2_] = useState(0);
    const [dei, dei_] = useState("");
    const [mess, mess_] = useState("");
    const [messe, messe_] = useState("");
    const [time, time_] = useState("");
    const [times, times_] = useState("");
    const [hours2, hours2_] = useState("");
    const [hours4, hours4_] = useState("");
    const [hours, hours_] = useState("");
    const [zaim, zaim_] = useState("");
    const [sum, sum_] = useState("");
    const [score_two, score_two_] = useState("");
    const [prods, prods_] = useState("");
    const [name_prod, name_prod_] = useState([]);
    const [shop_name_prod, shop_name_prod_] = useState([]);
    const [Additional_information, Additional_information_] = useState("");
    const [minut, minut_] = useState("");
    const [lengh, lengh_] = useState("");
    const [time2, time2_] = useState("");
    const [len2, len2_] = useState("");
    const [time3, time3_] = useState("");
    const [hours3, hours3_] = useState("");
    const [time5, time5_] = useState("");
    const [hours5, hours5_] = useState("");
    const [time6, time6_] = useState("");
    const [hours6, hours6_] = useState("");
    const [sums, sums_] = useState("");
    const [end_sums, end_sums_] = useState("");
    const [begin_sums, begin_sums_] = useState("");
    const [numb, numb_] = useState("");
    const [prosmotr, prosmotr_] = useState("");
    const [mag, mag_] = useState("");
    const [prod, prod_] = useState("");
    const [click, click_] = useState("");
    const [C, C_] = useState([]);
    sessionStorage.setItem("address", address);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("login", login);
    sessionStorage.setItem("score", score);
    sessionStorage.setItem("FIO", FIO);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("city", city);

    //setInterval(() => web3.eth.personal.unlockAccount(address, password), 30000);

    async function list(e) {

        if (e.target.value == "ACTIONS") {
            await Contract.methods.Check_time().send({ from: address });
            Additional_information_(await Contract.methods.Additional_information().call({ from: address }));
            let a = await Contract.methods.Additional_information().call({ from: address });
            dei_("ACTIONS");
            var d = new Date(a[0] * 1000),
                yyyy = d.getFullYear(),
                mm = ("0" + (d.getMonth() + 1)).slice(-2),
                dd = ("0" + d.getDate()).slice(-2),
                hh = d.getHours(),
                h = hh,
                min = ("0" + d.getMinutes()).slice(-2);
            hours4_(h + ":" + min);
            times_(dd + "." + mm + "." + yyyy + " г.");
            let c = await Contract.methods.LENGHT_SHOP().call();
            var g = 0;
            for (let i = 0; i < c[4]; i++) {
                let b = await Contract.methods.Viewing_PROD(i).call()
                if (b != "Data deleted")
                    g++;
            }
            lengh_(g);
        }

        let v = await Contract.methods.LENGHT_SHOP().call({ from: address });
        let l = 0;
        for (var j = 0; j <= v[5]; j++) {
            let b = await Contract.methods.Viewing_PRODUCT_SHOP(FIO, j).call();
            if (b[0] != "Data deleted")
                l++;
            len2_(l);
        }

        if (e.target.value == "THEME") {
            setColor(!w);
            w_(!w);
        }
        e.target.value = "";
    }

    async function exit(a) {
        if (a == "dei") {
            click_("");
            dei_("");
            zaim_("");
            prods_("");
            numb_(0);
            sums_("");
            time5_("");
        }
        if (a == "prod")
            prod_("");
        if (a == "messe")
            messe_("");
        if (a == "zaim") {
            click_(a);
            prods_("");
            zaim_("zaim");
            numb_(0);
            sums_("");
            time5_("");
        }
        if (a == "order") {
            click_(a);
            numb_(0);
            sums_("");
            prods_("");
            time5_("");
            let c = await Contract.methods.LENGHT_SHOP().call();
            let p = [];
            let d = 0;
            for (let i = 0; i < c[4]; i++) {
                let b = await Contract.methods.Viewing_PROD(i).call()
                if (b != "Data deleted") {
                    p[d] = b;
                    d++;
                }
            }
            name_prod_(p);
            zaim_("order");
        }
        if (a == "pr") {
            click_(a);
            let c = await Contract.methods.LENGHT_SHOP().call({ from: address });
            let p = [];
            let d = 0;
            for (var i = 0; i < c[5]; i++) {
                let b = await Contract.methods.Viewing_PRODUCT_SHOP(FIO, i).call({ from: address });
                if (b[0] != "Data deleted") {
                    p[d] = b[0];
                    d++;
                }
            }
            shop_name_prod_(p);
            zaim_("pr");
        }
    }

    async function Loan_from_a_bank() {
        try {
            zaim_("prog");
            if (sum != "" && minut != "") {
                await Contract.methods.Request_loan(sum, minut).send({ from: address });
                count2_(0);
                await Contract.methods.Check_time().send({ from: address });
                Additional_information_(await Contract.methods.Additional_information().call({ from: address }));
                zaim_("");
            }
            else {
                minut_("");
                sum_("");
                alert("ERROR, MAKE SURE THAT ALL THE FIELDS ARE FILLED IN!");
                zaim_("zaim");
            }
        } catch {
            minut_("");
            sum_("");
            alert("The error may be: \n 1. You have a loan.");
            zaim_("zaim");
        }
    }

    async function Pay_off_the_loan() {
        try {
            zaim_("prog");
            let j = await Contract.methods.Additional_information().call();
            for (var i = 0; i < j[2]; i++) {
                let x = await Contract.methods.Viewing_REQEST(i).call();
                if (x[5] == address)
                    await Contract.methods.The_bank_response(i, "2").send({ from: address });
            }
            Additional_information_(await Contract.methods.Additional_information().call({ from: address }));
            count2_(0);
            await web3.eth.sendTransaction({ from: address, to: "0x93d06580ee557334C0D599d4c52bAb9681D575B1", value: sum * 1000000000000000000 })
            let a = await web3.eth.getBalance(address);
            score_two_(a / 1000000000000000000);
            zaim_("");
        } catch {
            alert("The error can be: \n 1. There are not enough funds to repay the loan.");
            zaim_("");
        }
    }

    async function lit(e) {
        sums_("");
        numb_(0);
        let a = await Contract.methods.Viewing_PRODUCT(e.target.value).call();
        prosmotr_(a);
        C_(a[4]);
        var d = new Date(a[2] * 1000),
            yyyy = d.getFullYear(),
            mm = ("0" + (d.getMonth() + 1)).slice(-2),
            dd = ("0" + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ("0" + d.getMinutes()).slice(-2);
        hours2_(h + ":" + min);
        time2_(dd + "." + mm + "." + yyyy + " г.");

        var z = new Date(a[3] * 1000),
            yyyy = z.getFullYear(),
            mm = ("0" + (z.getMonth() + 1)).slice(-2),
            dd = ("0" + z.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ("0" + z.getMinutes()).slice(-2);
        hours3_(h + ":" + min);
        time3_(dd + "." + mm + "." + yyyy + " г.");
        prods_(e.target.value);
    }

    async function lit2(e) {
        let v = await Contract.methods.LENGHT_SHOP().call({ from: address });
        for (var i = 0; i < v[5]; i++) {
            let b = await Contract.methods.Viewing_PRODUCT_SHOP(FIO, i).call({ from: address });
            if (e.target.value == b[0]) {
                let b = await Contract.methods.Viewing_PRODUCT_SHOP(FIO, i++).call({ from: address })
                mag_(b);
                var d = new Date(b[1] * 1000),
                    yyyy = d.getFullYear(),
                    mm = ("0" + (d.getMonth() + 1)).slice(-2),
                    dd = ("0" + d.getDate()).slice(-2),
                    hh = d.getHours(),
                    h = hh,
                    min = ("0" + d.getMinutes()).slice(-2);
                hours5_(h + ":" + min);
                time5_(dd + "." + mm + "." + yyyy + " г.");

                var d = new Date(b[2] * 1000),
                    yyyy = d.getFullYear(),
                    mm = ("0" + (d.getMonth() + 1)).slice(-2),
                    dd = ("0" + d.getDate()).slice(-2),
                    hh = d.getHours(),
                    h = hh,
                    min = ("0" + d.getMinutes()).slice(-2);
                hours6_(h + ":" + min);
                time6_(dd + "." + mm + "." + yyyy + " г.");
            }
        }
    }

    async function getRandom() {
        let b;
        if (sums <= 100)
            b = (prosmotr[6] - (prosmotr[6] * rating) / 100) * 1 * sums;
        if (sums > 100 && sums <= 1000)
            b = (prosmotr[6] - (prosmotr[6] * rating) / 100) * 0.95 * sums;
        if (sums > 1000)
            b = (prosmotr[6] - (prosmotr[6] * rating) / 100) * 0.9 * sums;
        begin_sums_(b);
        let a = [];
        let index = 0;
        for (var i = 0; i < 6; i++) {
            a[i] = Math.random() * (-40 - 40) + 40;
            if (C[0] <= a[i] && a[i] <= C[1] + +10) {
            }
            else {
                let z = b / 100;
                let a = 0.1 - (z * 10);
                b = b + a
                index++;
            }
        }
        if (index != 0)
            numb_(index);
        else
            numb_("a")
        end_sums_(b);
    }

    async function Registration_PRODUCT_SHOP() {
        zaim_("prog");
        let s = Math.floor(+prosmotr[6] + +((prosmotr[6] * 50) / 100));
        await Contract.methods.Registration_PRODUCT_SHOP(prosmotr[0], s, sums).send({ from: address });
        await web3.eth.sendTransaction({ from: address, to: "0x14D07f6fEF21Ab5A38dac79686a4f6d22A95D28d", value: Math.floor(end_sums) * 1000000000000000000 })
        let a = await web3.eth.getBalance(address);
        score_two_(a / 1000000000000000000);
        let c = await Contract.methods.LENGHT_SHOP().call({ from: address });
        let d = 0;
        for (var i = 0; i < c[5]; i++) {
            let b = await Contract.methods.Viewing_PRODUCT_SHOP(FIO, i).call({ from: address });
            if (b[0] != "Data deleted") {
                d++;
            }
        }
        len2_(d);
        prods_("");
        numb_(0);
        sums_("");
        click_("");
        zaim_("");
    }

    async function Delete_PRODUCT_SHOP() {
        zaim_("prog");
        let c = await Contract.methods.LENGHT_SHOP().call({ from: address });
        for (var i = 0; i < c[5]; i++) {
            let g = await Contract.methods.Viewing_PRODUCT_SHOP(FIO, i).call({ from: address })
            if (g[0] == mag[0])
                await Contract.methods.Delete_PRODUCT_SHOP(FIO, i).send({ from: address })
        }
        let p = [];
        let d = 0;
        for (var i = 0; i < c[5]; i++) {
            let b = await Contract.methods.Viewing_PRODUCT_SHOP(FIO, i).call({ from: address });
            if (b[0] != "Data deleted") {
                p[d] = b[0];
                d++;
            }
        }
        len2_(d);
        time5_("");
        shop_name_prod_(p);
        click_("");
        zaim_("");
    }

    return (
        <>
            <header className="navbar_two">
                <select className="text" onChange={list}>
                    <option value='' hidden>OPTIONS</option>
                    {mas.map((arr, i) => <option key={i} value={String(arr)}>
                        {arr}
                    </option>)}</select>
                <Link to="./Page_1"><button className="text">EXIT</button></Link>
            </header>
            <br />
            <div style={{ float: "left" }}>
                <div className="message_two5" style={{ marginLeft: "40px" }}><br />
                    <div style={{ fontSize: "45px", fontWeight: "bolder" }}><center>STORE'S PERSONAL PAGE</center></div><br />
                    &nbsp;Title:&nbsp;{FIO} <br />
                    &nbsp;Login:&nbsp;{login} <br />
                    &nbsp;City:&nbsp;{city} <br />
                    {score_two == "" && <div>&nbsp;Current balance:&nbsp;{Math.round(parseFloat(score) * 100) / 100} <br /></div>}
                    {score_two != "" && <div>&nbsp;Current balance:&nbsp;{Math.round(parseFloat(score_two) * 100) / 100} <br /></div>}
                    {rating != "NaN" && <div>&nbsp;Rating:&nbsp;{Math.round(parseFloat(rating) * 100) / 100}<br /></div>}<br />
                </div><br />
            </div>

            <div style={{ float: "right" }}>
                {dei == "ACTIONS" && <div className="mes_but" style={{ marginRight: "40px" }}>
                    <button style={{ float: "right", marginRight: "20px" }} className="text_two" onClick={() => exit("dei")}>&#10006;</button>
                    {zaim != "prog" && Additional_information[1] == 4 && <div style={{ color: "#B22222", float: "left", marginLeft: "20px" }}>
                        <br />The loan repayment period is overdue
                        <br /> Loan amount: &nbsp;{Additional_information[3]}<br /><br /></div>}
                    {zaim != "prog" && Additional_information[1] == 3 && <div style={{ float: "left", marginLeft: "20px" }}>
                        <br /> Loan amount:&nbsp;{Additional_information[3]}<br />
                        The payment period is up <br /> to:&nbsp;{hours4}&nbsp; {times}<br /><br />
                    </div>}
                    <div style={{ float: "right" }}><br />
                        {lengh != 0 && click != "order" && <button className="button2" onClick={() => exit("order")}>ORDERING</button>}
                        {lengh != 0 && click == "order" && <button className="buttone" >ORDERING</button>}
                        {lengh != 0 && <br />}
                        {Additional_information[1] != 1 && Additional_information[1] != 2 && <button className="button2" onClick={Pay_off_the_loan}>PAY OFF THE LOAN</button>}
                        {Additional_information[1] != 1 && Additional_information[1] != 2 && <br />}
                        {len2 != 0 && click != "pr" && <button className="button2" onClick={() => exit("pr")}>PRODUCTS</button>}
                        {len2 != 0 && click == "pr" && <button className="buttone" >PRODUCTS</button>}{len2 != 0 && <br />}
                        {Additional_information[1] == 1 && click != "zaim" && <button className="button2" onClick={() => exit("zaim")}>LOAN FROM A BANK</button>}
                        {Additional_information[1] == 1 && click == "zaim" && <button className="buttone" >LOAN FROM A BANK</button>}</div>
                    {zaim == "pr" && <div style={{ marginLeft: "20px" }}><br />
                        <select className="text_two2" onChange={lit2}>
                            <option value='' hidden>PRODUCT NAME</option>
                            {shop_name_prod.map((arr, i) => <option key={i} value={String(arr)}>
                                {arr}
                            </option>)}</select><br />
                        {time5 != "" && <div>&nbsp;Emd date:<br />
                            <div style={{ color: "#544F4F" }}>&nbsp; &nbsp;{time5} {hours5}<br />
                                &nbsp; &nbsp;{time6} {hours6}<br />
                            </div>
                            {mag[3] == 2 && <div>&nbsp;Price:&nbsp;{mag[5]} for 1 piece<br /></div>}
                            {mag[3] == 1 && <div>&nbsp;Price:&nbsp;{mag[5]} for 1 kg<br /></div>}
                            &nbsp;Quantity in stock:&nbsp;{mag[4]}<br />
                            <br />
                            <button className="button3" onClick={Delete_PRODUCT_SHOP}>DELETE</button></div>}</div>}
                    {zaim != "prog" && (Additional_information[1] == 3 || Additional_information[1] == 4) && <div><br /><br /><br /><br /></div>}
                    {zaim == "order" && <div style={{ marginLeft: "20px" }}><br />
                        <select className="text_two2" onChange={lit}>
                            <option value='' hidden>PRODUCT NAME</option>
                            {name_prod.map((arr, i) => <option key={i} value={String(arr)}>
                                {arr}
                            </option>)}</select><br />
                        {prods != "" && <div>
                            &nbsp;Manufacturer:&nbsp;{prosmotr[1]}<br />
                            &nbsp;Expiration date:<br />
                            <div style={{ color: "#544F4F" }}>&nbsp; &nbsp;{time2} {hours2}<br />
                                &nbsp; &nbsp;{time3} {hours3}<br /></div>
                            &nbsp;Storage temperature:<br />
                            &nbsp;from&nbsp;{C[0]}&nbsp;до&nbsp;{C[1]} t°<br />
                            {prosmotr[5] == 2 && <div>&nbsp;Price:&nbsp;{prosmotr[6]} for 1 piece</div>}
                            {prosmotr[5] == 1 && <div>&nbsp;Price:&nbsp;{prosmotr[6]} for 1 kg</div>}
                            {prosmotr[5] == 2 && numb < 1 && <div>&nbsp;<input className="input" type="number" min="1" step="1" placeholder="&emsp;QUANTITY PER PIECE" value={sums} onChange={(e) => sums_(e.target.value)} /><br /></div>}
                            {prosmotr[5] == 1 && numb < 1 && <div>&nbsp;<input className="input" type="number" min="1" step="1" placeholder="&emsp;QUANTITY IN KG" value={sums} onChange={(e) => sums_(e.target.value)} /><br /></div>}
                            {prosmotr[5] == 1 && sums != "" && <div>&nbsp;Quantity: {sums} kg</div>}
                            {prosmotr[5] == 2 && sums != "" && <div>&nbsp;Quantity: {sums} pieces</div>}
                            {sums != "" && sums <= 100 && <div>&nbsp;The amount:&nbsp;{Math.round(parseFloat((prosmotr[6] - (prosmotr[6] * rating) / 100) * 1 * sums) * 100) / 100}</div>}
                            {sums != "" && sums > 100 && sums <= 1000 && <div>&nbsp;The amount:&nbsp;{Math.round(parseFloat((prosmotr[6] - (prosmotr[6] * rating) / 100) * 0.95 * sums) * 100) / 100}</div>}
                            {sums != "" && sums > 1000 && <div>&nbsp;The amount:&nbsp;{Math.round(parseFloat((prosmotr[6] - (prosmotr[6] * rating) / 100) * 0.9 * sums) * 100) / 100}</div>}
                            {sums != "" && numb < 1 && <button className="button3" onClick={getRandom}>ORDER</button>}
                            {numb > 0 && <div>
                                <div style={{ color: "#B22222" }}>&nbsp;Violation of the t° mode is {numb} times:</div>
                                &nbsp;Total amount: {Math.round(parseFloat(end_sums) * 100) / 100}<br />
                                &nbsp;<button className="button3" onClick={Registration_PRODUCT_SHOP}>TO ACCEPT</button><br />
                                &nbsp;<button className="button3" onClick={() => exit("order")}>REFUSE</button></div>}
                            {numb == "a" && <div> &nbsp;Total amount: {Math.round(parseFloat(end_sums) * 100) / 100}<br />
                                &nbsp;<button className="button3" onClick={Registration_PRODUCT_SHOP}>TO ACCEPT</button><br />
                                &nbsp;<button className="button3" onClick={() => exit("order")}>REFUSE</button></div>}
                        </div>}</div>}
                    <div style={{ float: "right", marginRight: "20px" }}><br />
                        {Additional_information[1] == 1 && <br />}{Additional_information[1] == 1 && <br />}
                        {Additional_information[1] == 2 && <br />}{Additional_information[1] == 2 && <br />}
                        {zaim == "prog" && <br />}{zaim == "prog" && <br />}
                    </div>

                    {zaim == "zaim" && <div style={{ float: "left", marginLeft: "100px" }}><br /><br />
                        <input className="input" placeholder="THE AMOUNT" type="number" min="1" step="1" value={sum} onChange={(e) => sum_(e.target.value)}></input><br />
                        <br />
                        <input className="input" type="number" min="1" step="1" placeholder="TERM IN MINUTES" value={minut} onChange={(e) => minut_(e.target.value)} ></input><br />
                        <button className="button3" onClick={Loan_from_a_bank}>TO SEND</button>
                    </div>}
                    {zaim == "prog" && <div style={{ float: "left", marginLeft: "200px" }}><center><br /><br /><br /><img src={pusk} width="200" alt="" /></center></div>}
                </div>}
            </div>

        </>
    );
};
export default Page_6;