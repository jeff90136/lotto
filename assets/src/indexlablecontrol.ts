const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    //開獎日期
    @property(cc.Label)
    datepow: cc.Label = undefined
    @property(cc.Label)
    datelot: cc.Label = undefined
    @property(cc.Label)
    dateluck: cc.Label = undefined
    @property(cc.Label)
    date539: cc.Label = undefined
    @property(cc.Label)
    date3star: cc.Label = undefined
    @property(cc.Label)
    date4star: cc.Label = undefined
    @property(cc.Label)
    date38: cc.Label = undefined
    @property(cc.Label)
    date39: cc.Label = undefined
    @property(cc.Label)
    date49: cc.Label = undefined
    //開獎期數
    @property(cc.Label)
    nopow: cc.Label = undefined
    @property(cc.Label)
    nolot: cc.Label = undefined
    @property(cc.Label)
    noluck: cc.Label = undefined
    @property(cc.Label)
    no539: cc.Label = undefined
    @property(cc.Label)
    no3star: cc.Label = undefined
    @property(cc.Label)
    no4star: cc.Label = undefined
    @property(cc.Label)
    no38: cc.Label = undefined
    @property(cc.Label)
    no39: cc.Label = undefined
    @property(cc.Label)
    no49: cc.Label = undefined
    //頭獎期數
    @property(cc.Label)
    leadpow: cc.Label = undefined
    @property(cc.Label)
    leadlot: cc.Label = undefined
    @property(cc.Label)
    leadluck: cc.Label = undefined
    @property(cc.Label)
    lead539: cc.Label = undefined
    @property(cc.Label)
    lead3star: cc.Label = undefined
    @property(cc.Label)
    lead4star: cc.Label = undefined
    @property(cc.Label)
    lead38: cc.Label = undefined
    @property(cc.Label)
    lead39: cc.Label = undefined
    @property(cc.Label)
    lead49: cc.Label = undefined
    //頭獎獎金
    @property(cc.Label)
    moneypow: cc.Label = undefined
    @property(cc.Label)
    moneylot: cc.Label = undefined
    @property(cc.Label)
    moneyluck: cc.Label = undefined
    @property(cc.Label)
    money539: cc.Label = undefined
    @property(cc.Label)
    money3star: cc.Label = undefined
    @property(cc.Label)
    money4star: cc.Label = undefined
    @property(cc.Label)
    money38: cc.Label = undefined
    @property(cc.Label)
    money39: cc.Label = undefined
    @property(cc.Label)
    money49: cc.Label = undefined
    //威力彩號碼
    @property(cc.Label)
    pown1: cc.Label = undefined
    @property(cc.Label)
    pown2: cc.Label = undefined
    @property(cc.Label)
    pown3: cc.Label = undefined
    @property(cc.Label)
    pown4: cc.Label = undefined
    @property(cc.Label)
    pown5: cc.Label = undefined
    @property(cc.Label)
    pown6: cc.Label = undefined
    @property(cc.Label)
    powsn: cc.Label = undefined
    //大樂透號碼
    @property(cc.Label)
    lotn1: cc.Label = undefined
    @property(cc.Label)
    lotn2: cc.Label = undefined
    @property(cc.Label)
    lotn3: cc.Label = undefined
    @property(cc.Label)
    lotn4: cc.Label = undefined
    @property(cc.Label)
    lotn5: cc.Label = undefined
    @property(cc.Label)
    lotn6: cc.Label = undefined
    @property(cc.Label)
    lotsn: cc.Label = undefined
    //大福彩號碼
    @property(cc.Label)
    luckn1: cc.Label = undefined
    @property(cc.Label)
    luckn2: cc.Label = undefined
    label: cc.Label = undefined
    @property(cc.Label)
    luckn3: cc.Label = undefined
    @property(cc.Label)
    luckn4: cc.Label = undefined
    @property(cc.Label)
    luckn5: cc.Label = undefined
    @property(cc.Label)
    luckn6: cc.Label = undefined
    @property(cc.Label)
    luckn7: cc.Label = undefined
    @property(cc.Label)
    lucksn: cc.Label = undefined
    //539號碼
    @property(cc.Label)
    ftnn1: cc.Label = undefined
    @property(cc.Label)
    ftnn2: cc.Label = undefined
    @property(cc.Label)
    ftnn3: cc.Label = undefined
    @property(cc.Label)
    ftnn4: cc.Label = undefined
    @property(cc.Label)
    ftnn5: cc.Label = undefined
    //3星彩
    @property(cc.Label)
    star3n1: cc.Label = undefined
    @property(cc.Label)
    star3n2: cc.Label = undefined
    @property(cc.Label)
    star3n3: cc.Label = undefined
    //4星彩
    @property(cc.Label)
    star4n1: cc.Label = undefined
    @property(cc.Label)
    star4n2: cc.Label = undefined
    @property(cc.Label)
    star4n3: cc.Label = undefined
    @property(cc.Label)
    star4n4: cc.Label = undefined
    //38樂合彩
    @property(cc.Label)
    ten1: cc.Label = undefined
    @property(cc.Label)
    ten2: cc.Label = undefined
    @property(cc.Label)
    ten3: cc.Label = undefined
    @property(cc.Label)
    ten4: cc.Label = undefined
    @property(cc.Label)
    ten5: cc.Label = undefined
    @property(cc.Label)
    ten6: cc.Label = undefined
    //39樂合彩
    @property(cc.Label)
    tnn1: cc.Label = undefined
    @property(cc.Label)
    tnn2: cc.Label = undefined
    @property(cc.Label)
    tnn3: cc.Label = undefined
    @property(cc.Label)
    tnn4: cc.Label = undefined
    @property(cc.Label)
    tnn5: cc.Label = undefined
    //49樂合彩
    @property(cc.Label)
    fnn1: cc.Label = undefined
    @property(cc.Label)
    fnn2: cc.Label = undefined
    @property(cc.Label)
    fnn3: cc.Label = undefined
    @property(cc.Label)
    fnn4: cc.Label = undefined
    @property(cc.Label)
    fnn5: cc.Label = undefined
    @property(cc.Label)
    fnn6: cc.Label = undefined

    //38=pow 39=539 49=lot 
    // private xhr = cc.loader.getXMLHttpRequest()
    private resorce = []

    onLoad() {
        this.Xmlrequest(this,this.insertdata)

    }

    Xmlrequest(self,func){
        let xhr = cc.loader.getXMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && (this.status >= 200 && this.status < 400)) {
                func(self,this)
            }
        }
        xhr.open("GET", "http://localhost/lott/outputindex.php", true)
        // xhr.open("GET", "http://172.20.10.2/lott/outputindex.php", true)
        // xhr.open("GET", "http://172.20.10.12/lott/outputindex.php", true)
        xhr.send()
    }


    insertdata(self,xhr){
        let response = JSON.parse(xhr.responseText)
        // 威力彩
        self.datepow.string = response[0].Date
        self.nopow.string = response[0].No
        self.leadpow.string = "頭獎"
        let ttmoney:string = ""
        if(response[0].totalmoney == '0'){
            ttmoney = response[0].money
        }else{
            ttmoney = response[0].totalmoney
        }
        if(ttmoney.length>10){
            self.moneypow.string = ttmoney.substr(0,ttmoney.length-10)+"億"
        }else{
            self.moneypow.string = ttmoney.substr(0,ttmoney.length-9)+"千萬"
        }
        // let ttmoney:string = response[0].totalmoney
        // self.moneypow.string = ttmoney.substr(0,ttmoney.length-10)+"億"
        self.pown1.string = response[0].number1
        self.pown2.string = response[0].number2
        self.pown3.string = response[0].number3
        self.pown4.string = response[0].number4
        self.pown5.string = response[0].number5
        self.pown6.string = response[0].number6
        self.powsn.string = response[0].numbersp
        // 大樂透
        self.datelot.string = response[1].Date
        self.nolot.string = response[1].No
        self.leadlot.string = "頭獎"
        let ttmoney2:string = ""
        if(response[1].totalmoney == '0'){
            ttmoney2 = response[1].money
        }else{
            ttmoney2 = response[1].totalmoney
        }
        if(ttmoney2.length>10){
            self.moneylot.string = ttmoney2.substr(0,ttmoney2.length-10)+"億"
        }else{
            self.moneylot.string = ttmoney2.substr(0,ttmoney2.length-9)+"千萬"
        }
        // let ttmoney2:string = response[1].totalmoney
        // self.moneylot.string = ttmoney2.substr(0,ttmoney2.length-10)+"億"
        // cc.log(response[1].totalmoney)
        self.lotn1.string = response[1].number1
        self.lotn2.string = response[1].number2
        self.lotn3.string = response[1].number3
        self.lotn4.string = response[1].number4
        self.lotn5.string = response[1].number5
        self.lotn6.string = response[1].number6
        self.lotsn.string = response[1].numbersp
        // 大福彩
        self.dateluck.string = response[2].Date
        self.noluck.string = response[2].No
        self.leadluck.string = "頭獎"
        let ttmoney3:string = ""
        if(response[2].totalmoney == '0'){
            ttmoney3 = response[2].money
        }else{
            ttmoney3 = response[2].totalmoney
        }
        if(ttmoney3.length>10){
            self.moneyluck.string = ttmoney3.substr(0,ttmoney3.length-10)+"億"
        }else{
            self.moneyluck.string = ttmoney3.substr(0,ttmoney3.length-9)+"千萬"
        }
        // let ttmoney3:string = response[2].totalmoney
        // self.moneyluck.string = ttmoney3.substr(0,ttmoney3.length-10)+"億"
        cc.log(response[2].totalmoney)
        self.luckn1.string = response[2].number1
        self.luckn2.string = response[2].number2
        self.luckn3.string = response[2].number3
        self.luckn4.string = response[2].number4
        self.luckn5.string = response[2].number5
        self.luckn6.string = response[2].number6
        self.luckn7.string = response[2].number7
        self.lucksn.string = response[2].numbersp
        // 539
        self.date539.string = response[3].Date
        self.no539.string = response[3].No
        self.lead539.string = "頭獎"
        self.money539.string = "800萬"
        self.ftnn1.string = response[3].number1
        self.ftnn2.string = response[3].number2
        self.ftnn3.string = response[3].number3
        self.ftnn4.string = response[3].number4
        self.ftnn5.string = response[3].number5

        // 3星彩
        self.date3star.string = response[4].Date
        self.no3star.string = response[4].No
        self.lead3star.string = ""
        self.money3star.string = ""
        self.star3n1.string = response[4].number1
        self.star3n2.string = response[4].number2
        self.star3n3.string = response[4].number3

        // 4星彩
        self.date4star.string = response[5].Date
        self.no4star.string = response[5].No
        self.lead4star.string = ""
        self.money4star.string = ""
        self.star4n1.string = response[5].number1
        self.star4n2.string = response[5].number2
        self.star4n3.string = response[5].number3
        self.star4n4.string = response[5].number4

        // 38樂合彩
        self.date38.string = self.datepow.string
        self.no38.string = self.nopow.string
        self.lead38.string = ""
        self.money38.string = ""
        self.ten1.string = self.pown1.string
        self.ten2.string = self.pown2.string
        self.ten3.string = self.pown3.string
        self.ten4.string = self.pown4.string
        self.ten5.string = self.pown5.string
        self.ten6.string = self.pown6.string

        // 39樂合彩
        self.date39.string = self.date539.string
        self.no39.string = self.no539.string
        self.lead39.string = ""
        self.money39.string = ""
        self.tnn1.string = self.ftnn1.string
        self.tnn2.string = self.ftnn2.string
        self.tnn3.string = self.ftnn3.string
        self.tnn4.string = self.ftnn4.string
        self.tnn5.string = self.ftnn5.string

        // 49樂合彩
        self.date49.string = self.datelot.string
        self.no49.string = self.nolot.string
        self.lead49.string = ""
        self.money49.string = ""
        self.fnn1.string = self.lotn1.string
        self.fnn2.string = self.lotn2.string
        self.fnn3.string = self.lotn3.string
        self.fnn4.string = self.lotn4.string
        self.fnn5.string = self.lotn5.string
        self.fnn6.string = self.lotn6.string

    }
}
