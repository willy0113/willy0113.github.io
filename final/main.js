

let content1 = ['請問Antigone的妹妹是誰？', '"He has no right to keep me from my own."的He是誰？', '在Antigone中誰懂得中庸之道？', '誰殺了Hamlet的爸爸？', '"I must be cruel only to be kind"是誰的名言？', 'Polonius認為是誰讓Hamlet發瘋？', 'Gloucester的私生子是誰？', 'Lear的三個女兒中誰真正愛他？', '"My master calls me, I must not say no."是誰說的？', '在李爾王中誰被戳瞎雙眼？']

let correct1 = ['Ismene', 'Creon', 'Haemon', 'Claudius', 'Hamlet', 'Ophelia', 'Edmund', 'Cordelia', 'Kent', 'Gloucester', 'Odysseus', 'Goneril', 'Regan', 'Helmet', 'Edgar']


let content2 = ['"I know him to be artful, selfish...in short, a sentimental knave"這裡的sentimental knave指誰？', '誰自己單方面喜歡Charles Surface？', '"I have lately detected him in frequent conference with old Rowley"其中的him是誰？', 'Sir Oliver假扮成誰去見Charles？', '在screen scene這幕裡誰躲在屏風後面？', '《四川好人》的作者是誰？', '《四川好人》裡的賣水人叫什麼？', 'Shen Te愛上的飛行員是誰？', '《四川好人》裡誰給了Shen Te一張空白支票？', '"She is a human being, sir! And not devoid of common sense!"是誰說的？']
let correct2 = ['Joseph', 'Lady Sneerwell', 'Snake', 'Mr. Premium', 'Lady Teazle', 'Bertholt Brecht', 'Wong', 'Yang Sun', 'Shu Fu', 'Shui Ta', 'Mr. Stanley', 'Mr. Moses', 'Carpenter', 'Rowley', 'Maria']


let content3 = ['在Juno and the Paycock這部劇中paycock所指的是誰？', '在Spreading The News這部劇中誰把農具忘在市集？', '在Juno and the Paycock這部劇中Mary懷了誰的孩子？', '在The Factory Girls中，誰說了"I would rather have a horse than get married"？', '"in the one Love, in the other Freedom. And she said to the woman, Freedom"這句話是誰說的？', '誰是The Belle of the Belfast City這部劇中唯一的黑人？', '"I want a life of my own. My own!...Most of all not yours. I am walking away from this violence."是誰說的？', '"In England they lock her up if she is mad but let her go if she is political. In Ireland they lock her up if she is political and let her go if she is mad."是誰說的？', '在The Beauty Queen Of Leenane這部劇中誰殺了Mag？','在The Beauty Queen Of Leenane這部劇中Pato請誰幫他送信？']
let correct3 = ['Jack Boyle', 'Jack Smith', 'Charles Bentham', 'Rosemary', 'Rebecca', 'Belle', 'Janet', 'Helen', 'Maureen', 'Ray', 'Dolly', 'Vi', 'Peter', 'Ellen', 'Rohan']


var RandomInt = (start, end) => {
    // 計算放大的倍數
    let n = end - start + 1
    // 放大
    r = Math.random() * n
    // 無條件捨去
    r = Math.floor(r)
    // 位移到 start
    r = r + start
    return r
}
// 亂數順序
var Randomcor1 = (start, end, Times) => {
    var randomcor1 = []
    for (let i = 0; i <end + 1; i++) {
        randomcor1.push(i)
    };
    for (let i = 0; i < Times; i++) {
        // 隨機取出[r] 並與[0]交換
        let r = RandomInt(start, end)
        let temp = randomcor1[r]
        randomcor1[r] = randomcor1[0]
        randomcor1[0] = temp
    }
    return  randomcor1;
}

var nb = 0 /*題號*/
var nbarray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
var score = 0;//分數
//產生問題
function changeq(){
    let $content1 = content1[nb];
    $('.intro').empty();
    $('.intro').append($content1).append($('<div>').addClass('separate')).append($('<div>').addClass('box'));
    $('.intro').show();
    console.log($('.intro').text());
    $('.box').append($('<button onClick = "clickbtna()">').addClass('btn a')).append($('<div>').addClass('separatebtn')).append($('<button onClick = "clickbtnb()">').addClass('btn b')).append($('<div>').addClass('separatebtn')).append($('<button onClick = "clickbtnc()">').addClass('btn c'));
    $('.box div').css('width', '20px');
    $('.box').show();
    
};

function changeq2() {
    let $content2 = content2[nb];
    $('.intro').empty();
    $('.intro').append($content2).append($('<div>').addClass('separate')).append($('<div>').addClass('box'));
    $('.intro').show();
    console.log($('.intro').text());
    $('.box').append($('<button onClick = "clickbtna2()">').addClass('btn a')).append($('<div>').addClass('separatebtn').attr('width','20px')).append($('<button onClick = "clickbtnb2()">').addClass('btn b')).append($('<div>').addClass('separatebtn')).append($('<button onClick = "clickbtnc2()">').addClass('btn c'));
    $('.box div').css('width', '20px');
    $('.box').show();
};

function changeq3() {
    let $content3 = content3[nb];
    $('.intro').empty();
    $('.intro').append($content3).append($('<div>').addClass('separate')).append($('<div>').addClass('box'));
    $('.intro').show();
    console.log($('.intro').text());
    $('.box').append($('<button onClick = "clickbtna3()">').addClass('btn a')).append($('<div>').addClass('separatebtn').attr('width','20px')).append($('<button onClick = "clickbtnb3()">').addClass('btn b')).append($('<div>').addClass('separatebtn')).append($('<button onClick = "clickbtnc3()">').addClass('btn c'));
    $('.box div').css('width', '20px');
    $('.box').show();
};





var nbarray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
var choice = [];
//產生三個選項(包含答案)
function createchoice(){
    choice = [];
    choice.push(nbarray[nb]);
    otherChoice = Randomcor1(0, 14, 100);
    for (let i = 0; i < 15; i++) {
        if (choice.length < 3) {
            if (otherChoice[i] != nbarray[nb]) {
                choice.push(otherChoice[i]);   
            }   else{
                continue;
            }
        }   else if(choice.length = 3) {
            return choice;
        }
    }  
}


var randomChoice = []; 
var randomChoice = Randomcor1(0,2,10)
//將選項插入按鈕
function insertChoice(){
    randomChoice = Randomcor1(0,2,10)
    for(i=0; i<3; i++){
        var iRand = parseInt(3 * Math.random());
        let tem = choice[i];
        choice[i] = choice[iRand];
        choice[iRand] = tem;
    };
       
    $('.a').text(correct1[choice[0]]);
    $('.b').text(correct1[choice[1]]);
    $('.c').text(correct1[choice[2]]);
    console.log($('.btn').text());
}

function insertChoice2() {
    randomChoice = Randomcor1(0,2,10)
    for(i=0; i<3; i++){
        var iRand = parseInt(3 * Math.random());
        let tem = choice[i];
        choice[i] = choice[iRand];
        choice[iRand] = tem;
    };
       
    $('.a').text(correct2[choice[0]]);
    $('.b').text(correct2[choice[1]]);
    $('.c').text(correct2[choice[2]]);
    console.log($('.btn').text());
};

function insertChoice3() {
    randomChoice = Randomcor1(0,2,10)
    for(i=0; i<3; i++){
        var iRand = parseInt(3 * Math.random());
        let tem = choice[i];
        choice[i] = choice[iRand];
        choice[iRand] = tem;
    };
       
    $('.a').text(correct3[choice[0]]);
    $('.b').text(correct3[choice[1]]);
    $('.c').text(correct3[choice[2]]);
    console.log($('.btn').text());
};

//按鈕觸發函數
function clickbtna() {
    /*console.log('2');*/
    if (nb < 9) {
        if ($('.a').html() == correct1[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1;
            score = score + 0;
        }
        /*console.log(nb);*/
        changeq();
        createchoice();
        insertChoice();
        $('.btn').show();
    }else if (nb == 9) {
        /*console.log('抓9');*/
        if ($('.a').html() == correct1[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1;
            score = score + 0;
        };

        /*console.log('抓10')*/
        $('.intro').empty();
        $('.intro').append(score + '分').append($('<div>').addClass('separate')).append($('<div>').addClass('box'));
        $('.intro').show();
        /*console.log($('.intro').text());*/
        if (score < 60) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 60) {
            $('.box').append($('<div>').text('恭喜你成功幫助小明逃出迷宮！'));
            $('.box').show();
            $('.container').addClass('win');
        }  
    }
}

function clickbtna2() {
    /*console.log('2');*/
    if (nb < 9) {
        if ($('.a').html() == correct2[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1;
            score = score + 0;
        }
        /*console.log(nb);*/
        changeq2();
        createchoice();
        insertChoice2();
        $('.btn').show();
    }else if (nb == 9) {
        /*console.log('抓9');*/
        if ($('.a').html() == correct2[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1;
            score = score + 0;
        };

        /*console.log('抓10')*/
        $('.intro').empty();
        $('.intro').append(score + '分').append($('<div>').addClass('separate')).append($('<div>').addClass('box'));
        $('.intro').show();
        /*console.log($('.intro').text());*/
        if (score < 60) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 60) {
            $('.box').append($('<div>').text('恭喜你成功幫助小明逃出迷宮！'));
            $('.box').show();
            $('.container').addClass('win');
        }  
    }
}

function clickbtna3() {
    /*console.log('2');*/
    if (nb < 9) {
        if ($('.a').html() == correct3[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1;
            score = score + 0;
        }
        /*console.log(nb);*/
        changeq3();
        createchoice();
        insertChoice3();
        $('.btn').show();
    }else if (nb == 9) {
        /*console.log('抓9');*/
        if ($('.a').html() == correct3[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1;
            score = score + 0;
        };

        /*console.log('抓10')*/
        $('.intro').empty();
        $('.intro').append(score + '分').append($('<div>').addClass('separate')).append($('<div>').addClass('box'));
        $('.intro').show();
        /*console.log($('.intro').text());*/
        if (score < 60) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 60) {
            $('.box').append($('<div>').text('恭喜你成功幫助小明逃出迷宮！'));
            $('.box').show();
            $('.container').addClass('win');
        }  
    }
}

function clickbtnb() {
    /*console.log('2');*/
    if (nb < 9) {
        if ($('.b').html() == correct1[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1
            score = score + 0;
        };
        changeq();
        createchoice();
        insertChoice();
        $('.btn').show();
    }else if (nb == 9) {
        /*console.log('抓9');*/
        if ($('.b').html() == correct1[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1
            score = score + 0;
        };
        
        /*console.log('抓10')*/
        $('.intro').empty();
        $('.intro').append(score + '分').append($('<div>').addClass('separate')).append($('<div>').addClass('box'));
        $('.intro').show();
        /*console.log($('.intro').text());*/
        if (score < 60) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 60){
            $('.box').append($('<div>').text('恭喜你成功幫助小明逃出迷宮！'));
            $('.box').show();
            $('.container').addClass('win');
        }
        
    }
    
}

function clickbtnb2() {
    /*console.log('2');*/
    if (nb < 9) {
        if ($('.b').html() == correct2[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1
            score = score + 0;
        };
        changeq2();
        createchoice();
        insertChoice2();
        $('.btn').show();
    }else if (nb == 9) {
        /*console.log('抓9');*/
        if ($('.b').html() == correct2[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1
            score = score + 0;
        };
        
        /*console.log('抓10')*/
        $('.intro').empty();
        $('.intro').append(score + '分').append($('<div>').addClass('separate')).append($('<div>').addClass('box'));
        $('.intro').show();
        /*console.log($('.intro').text());*/
        if (score < 60) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 60){
            $('.box').append($('<div>').text('恭喜你成功幫助小明逃出迷宮！'));
            $('.box').show();
            $('.container').addClass('win');
        }
        
    }
    
}

function clickbtnb3() {
    /*console.log('2');*/
    if (nb < 9) {
        if ($('.b').html() == correct3[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1
            score = score + 0;
        };
        changeq3();
        createchoice();
        insertChoice3();
        $('.btn').show();
    }else if (nb == 9) {
        /*console.log('抓9');*/
        if ($('.b').html() == correct3[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1
            score = score + 0;
        };
        
        /*console.log('抓10')*/
        $('.intro').empty();
        $('.intro').append(score + '分').append($('<div>').addClass('separate')).append($('<div>').addClass('box'));
        $('.intro').show();
        /*console.log($('.intro').text());*/
        if (score < 60) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 60){
            $('.box').append($('<div>').text('恭喜你成功幫助小明逃出迷宮！'));
            $('.box').show();
            $('.container').addClass('win');
        }
        
    }
    
}
function clickbtnc() {
    /*console.log('2');*/
    if (nb < 9) {
        if ($('.c').html() == correct1[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1;
            score = score + 0;
        }
        /*console.log(nb);*/
        changeq();
        createchoice();
        insertChoice();
        $('.btn').show();
    }else if (nb == 9) {
        /*console.log('抓9')*/
        if ($('.c').html() == correct1[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1;
            score = score + 0;
        };

        /*console.log('抓10')*/
        $('.intro').empty();
        $('.intro').append(score + '分').append($('<div>').addClass('separate')).append($('<div>').addClass('box'));
        $('.intro').show();
        /*console.log($('.intro').text());*/
        if (score < 60) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 60) {
            $('.box').append($('<div>').text('恭喜你成功幫助小明逃出迷宮！'));
            $('.box').show();
            $('.container').addClass('win');
        }

    }
}

function clickbtnc2() {
    /*console.log('2');*/
    if (nb < 9) {
        if ($('.c').html() == correct2[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1;
            score = score + 0;
        }
        /*console.log(nb);*/
        changeq2();
        createchoice();
        insertChoice2();
        $('.btn').show();
    }else if (nb == 9) {
        /*console.log('抓9')*/
        if ($('.c').html() == correct2[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1;
            score = score + 0;
        };

        /*console.log('抓10')*/
        $('.intro').empty();
        $('.intro').append(score + '分').append($('<div>').addClass('separate')).append($('<div>').addClass('box'));
        $('.intro').show();
        /*console.log($('.intro').text());*/
        if (score < 60) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 60) {
            $('.box').append($('<div>').text('恭喜你成功幫助小明逃出迷宮！'));
            $('.box').show();
            $('.container').addClass('win');
        }

    }
}

function clickbtnc3() {
    /*console.log('2');*/
    if (nb < 9) {
        if ($('.c').html() == correct3[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1;
            score = score + 0;
        }
        /*console.log(nb);*/
        changeq3();
        createchoice();
        insertChoice3();
        $('.btn').show();
    }else if (nb == 9) {
        /*console.log('抓9')*/
        if ($('.c').html() == correct3[nb]) {
            score = score + 10;
            /*console.log(score);*/
            nb = nb + 1;
        }else {
            nb = nb + 1;
            score = score + 0;
        };

        /*console.log('抓10')*/
        $('.intro').empty();
        $('.intro').append(score + '分').append($('<div>').addClass('separate')).append($('<div>').addClass('box'));
        $('.intro').show();
        /*console.log($('.intro').text());*/
        if (score < 60) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 60) {
            $('.box').append($('<div>').text('恭喜你成功幫助小明逃出迷宮！'));
            $('.box').show();
            $('.container').addClass('win');
        }

    }
}



$(() => {
    
    $('.button1').click(() => {
        $('.button1').hide();
        $('.button2').show();
    })
        
    $('#mode1').click(() => {
        /*console.log('1');*/
        $('h1').hide();
        $('p').hide();
        $('.button2').hide();
        changeq();
        createchoice();
        insertChoice();
        /*console.log($('.btn').text());*/
        $('.btn').show();
        /*console.log($('.b').html());*/
    })

    $('#mode2').click(() => {
        /*console.log('1');*/
        $('h1').hide();
        $('p').hide();
        $('.button2').hide();
        changeq2();
        createchoice();
        insertChoice2();
        /*console.log($('.btn').text());*/
        $('.btn').show();
        /*console.log($('.b').html());*/
    })
    
    $('#mode3').click(() => {
        /*console.log('1');*/
        $('h1').hide();
        $('p').hide();
        $('.button2').hide();
        changeq3();
        createchoice();
        insertChoice3();
        /*console.log($('.btn').text());*/
        $('.btn').show();
        /*console.log($('.b').html());*/
    })
});


        





