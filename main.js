

let content1 = ['請問下列何者是耶穌12門徒之一？', '下列何者為特洛伊戰爭中的女主角？', '「我來，我見，我征服」是誰的名言？', '圓桌武士效忠於哪一個王？', '〈坎特伯里故事集〉的作者為？', '戀母情結的正式名稱源自於誰？', '在〈地獄〉中誰引領但丁穿過地獄？', '在〈聖經〉中誰殺了自己的親弟弟？', '在〈聖經〉中誰吃了禁果？', '亞里斯多德的老師為？']

let correct1 = ['John', 'Helen', 'Julius Caesar', 'Arthur', 'Geoffrey Chaucer', 'Oedipus', 'Virgil', 'Cain', 'Eve', 'Plato', 'Odysseus', 'Joy', 'Karen', 'Petrarch', 'Alexander']


let content2 = ['請問〈烏托邦〉的作者為下列何者？', '在〈失樂園〉中誰誘惑夏娃吃禁果？', '請問〈格列佛遊記〉的作者為？', '〈哈姆雷特〉、〈李爾王〉、〈馬克白〉和〈奧賽羅〉是誰所寫的四大悲劇？', '下列何者是〈第十二夜〉的角色之一？', '下列何者為〈咆哮山莊〉的作者？', '"The Raven"為哪一位詩人的作品？', '受巴洛克風格影響的玄學派詩人為？', '現在英語國家最為流行的〈欽定版聖經〉為哪一個王下令翻譯的？', '秀髮劫的主角名字為？']
let correct2 = ['Thomas More', 'Satan', 'Jonathan Swift', 'William Shakespeare', 'Viola', 'Emily Brontë', 'Edgar Allan Poe', 'John Donne', 'James', 'Belinda', 'John Legend', 'Olivia', 'Wade', 'Elizabeth', 'Aphra Behn']


let content3 = ['請問〈都柏林人〉的作者為下列何者？', '下列哪位女性諾貝爾文學獎得主主要關注種族議題？', '下列哪位英國作家的知名小說為〈達洛維夫人〉並被譽為二十世紀現代主義與女性主義的先鋒？', '在〈聖堂殉道記〉中死者的名字為？', '〈克拉普最後的錄音帶〉中有一幕經典的吃香蕉片段讓人印象深刻，請問主角的名字為？', '下列何者圍著名愛爾蘭詩人，"Easter, 1916"為他的詩？', '著名反烏托邦電影"1984"改編自哪位作者的書？', '世界文學名著〈亂世佳人〉的男主角為？', '請問三大反烏托邦作品中〈美麗新世界〉的作者為？','〈大亨小傳〉為20世紀美國經典文學作品，請問男主角名字為？']
let correct3 = ['James Joyce', 'Toni Morrison', 'Virginia Woolf', 'Thomas Becket', 'Krapp', 'William Butler Yeats', 'George Orwell', 'Rhett Butler', 'Aldous Huxley', 'Gatsby', 'Scott Fitzgerald', 'Jason', 'Joseph', 'Barista', 'Manuel']


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
        if (score < 50) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 50) {
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
        if (score < 50) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 50) {
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
        if (score < 50) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 50) {
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
        if (score < 50) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 50){
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
        if (score < 50) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 50){
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
        if (score < 50) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 50){
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
        if (score < 50) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 50) {
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
        if (score < 50) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 50) {
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
        if (score < 50) {
            $('.box').append($('<div>').text('哇！小明沒逃出迷宮'));
            $('.box').show();
            $('.container').addClass('lose');
        }else if (score >= 50) {
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


        





