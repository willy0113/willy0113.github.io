import random, pygame, sys, time
from pygame.locals import *
from collections import deque

FPS = 30 #設置影格率
WINDOWWIDTH = 500# 視窗寬度
WINDOWHEIGHT = 500# 視窗高度
REVEALSPEED = 8# 設置box滑動和顯示的速度
BOXSIZE = 40# 設置box的大小
GAPSIZE = 10# 設置box的間隔
BOARDWIDTH = 4# 設置横向box的數量
BOARDHEIGHT = 4# 設置縱向box的數量


# 斷言:總的box數必須能被2整除，因為要兩兩配對
assert (BOARDWIDTH * BOARDHEIGHT) % 2 == 0, '總的box數必須是偶数'

XMARGIN = int((WINDOWWIDTH - (BOARDWIDTH * (BOXSIZE + GAPSIZE))) / 2)# 計算距離x軸邊緣的距離
YMARGIN = int((WINDOWHEIGHT - (BOARDHEIGHT * (BOXSIZE + GAPSIZE))) / 2)# 計算距離y軸邊緣的距離

# R G B
GRAY = (100, 100, 100)
NAVYBLUE = ( 60, 60, 100)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = ( 0, 255, 0)
BLUE = ( 0, 0, 255)
YELLOW = (255, 255, 0)
ORANGE = (255, 128, 0)
PURPLE = (255, 0, 255)
CYAN = ( 0, 255, 255)
BLACK = (0,0,0)

BGCOLOR =BLACK# 設置背景色
LIGHTBGCOLOR = GRAY# 設置亮背景色
BOXCOLOR = WHITE# 設置box的顏色
HIGHLIGHTCOLOR = BLUE# 設置高亮颜色

#定義形狀
DONUT = 'donut'# 甜甜圈
SQUARE = 'square'# 方形
DIAMOND = 'diamond'# 鑽石
LINES = 'lines'# 多條線
OVAL = 'oval'# 橢圓

ALLCOLORS = (RED, GREEN, BLUE, YELLOW , ORANGE , PURPLE, CYAN)
 
ALLSHAPES = (DONUT, SQUARE, LINES,DIAMOND, OVAL)


# 斷言:颜色和形狀的數量的成績的兩倍必須大於所有的box的數量，這樣才能保證在每一對都不重複的情况下也能填滿所有的box
assert len(ALLCOLORS) * len(ALLSHAPES) * 2 >= BOARDWIDTH * BOARDHEIGHT, "顏色和形狀數量的乘機的兩倍必須大於所有的box的數量"

#顯示文字
def showText(fontObj,text,x,y):
    
    textSurfaceObj = fontObj.render(text, True, WHITE , BLACK)# 配置要顯示的文字

    textRectObj = textSurfaceObj.get_rect()# 獲得要顯示的對象的rect

    textRectObj.center = (x, y)# 設置顯示對象的座標


    DISPLAYSURF.blit(textSurfaceObj, textRectObj)# 繪製字體
    
# 生成一個10*7的數組，用来存放box的狀態                
def generateRevealedBoxesData(val):
    revealedBoxes = []
    for i in range(BOARDWIDTH):
        revealedBoxes.append([val] * BOARDHEIGHT)
    
    return revealedBoxes            

# 隨機生成board内的遊戲數據        
def getRandomizedBoard():
    
    # 全排列舉所有的顏色和形狀的组合，存在icons中
    icons = []
    for color in ALLCOLORS:
        for shape in ALLSHAPES:
            icons.append( (shape, color) )

    random.shuffle(icons) # 隨機打亂icons裡的元素的順序
    
    numIconsUsed = int(BOARDWIDTH * BOARDHEIGHT / 2) # 計算需要多少種的元素(也就是board裡所有box的一半)
    
    icons = icons[:numIconsUsed] * 2 # 將上面得到的元素複製一份(得到的结果就可以兩兩配對)
    
    random.shuffle(icons)# 再次打亂 icons 裡的元素的順序


    # 創建用來存放 board 數據的結構，將上面處理好的 icons 分組放入 board 中
    board = []
    for x in range(BOARDWIDTH):
        column = []
        for y in range(BOARDHEIGHT):
            column.append(icons[0])
            del icons[0] # 刪除已经複製的元素
        board.append(column)
    
    return board        
        

# 根據groupSize大小分组
def splitIntoGroupsOf(groupSize, theList):
    #將一個list分成以groupSize為大小的多個组
    result = []
    for i in range(0, len(theList), groupSize):
        result.append(theList[i:i + groupSize])
    return result



# 計算出box的左上角的像素座標
def leftTopCoordsOfBox(boxx, boxy):
    # 將数字座標轉化成像素座標
    left = boxx * (BOXSIZE + GAPSIZE) + XMARGIN
    top = boxy * (BOXSIZE + GAPSIZE) + YMARGIN
    return (left, top)


# 根據鼠標的像素座標獲得box的座標(也就是獲得鼠標所指的box)
def getBoxAtPixel(x, y):
    for boxx in range(BOARDWIDTH):
        for boxy in range(BOARDHEIGHT):
            left, top = leftTopCoordsOfBox(boxx, boxy)
            boxRect = pygame.Rect(left, top, BOXSIZE, BOXSIZE)
            if boxRect.collidepoint(x, y):
                return (boxx, boxy)
    return (None, None)


# 繪製圖標，將顏色和形狀繪製在相應的box中
def drawIcon(shape, color, boxx, boxy):
    quarter = int(BOXSIZE * 0.25) # 1/4的box大小
    half = int(BOXSIZE * 0.5) # 1/2的box大小

    left, top = leftTopCoordsOfBox(boxx, boxy) # 獲得box的左上角的像素座標
    
    
    # 繪製圖形
    if shape == DONUT:# 甜甜圈
        pygame.draw.circle(DISPLAYSURF, color, (left + half, top + half), half - 5)
        pygame.draw.circle(DISPLAYSURF, BGCOLOR, (left + half, top + half), quarter - 5)
        
    elif shape == SQUARE:# 方形
        pygame.draw.rect(DISPLAYSURF, color, (left + quarter, top + quarter, BOXSIZE - half, BOXSIZE - half))    
        
    elif shape == DIAMOND:# 鑽石
        pygame.draw.polygon(DISPLAYSURF, color, ((left + half, top), (left + BOXSIZE - 1, top + half), (left + half, top + BOXSIZE - 1), (left, top + half)))    
        
    elif shape == LINES:# 多條線 
        for i in range(0, BOXSIZE, 4):
            pygame.draw.line(DISPLAYSURF, color, (left, top + i), (left + i, top))
            pygame.draw.line(DISPLAYSURF, color, (left + i, top + BOXSIZE - 1), (left + BOXSIZE - 1, top + i))    
        
    elif shape == OVAL:# 橢圓
        pygame.draw.ellipse(DISPLAYSURF, color, (left, top + quarter, BOXSIZE, half))    
        

# 根據box座標獲得box的形狀和顏色       
def getShapeAndColor(board, boxx, boxy):
    # 形狀值對應的存在board[x][y][0]中        
    # 顏色值對應的存在board[x][y][1]中
    return board[boxx][boxy][0], board[boxx][boxy][1]    
        
        
        
# 繪製box上的coverage
def drawBoxCovers(board, boxes, coverage):
    # 繪製覆蓋/揭開的box 
    for box in boxes:# 獲得每一個box
        
        left, top = leftTopCoordsOfBox(box[0], box[1])# 計算每一個box的左上角像素座標

        
        pygame.draw.rect(DISPLAYSURF, WHITE, (left, top, BOXSIZE, BOXSIZE))# 將這個box繪製成白色
        
        shape, color = getShapeAndColor(board, box[0], box[1])# 獲得這個box裡存放的形狀和顏色
        
        drawIcon(shape, color, box[0], box[1])# 繪製對應的圖標
        
        if coverage > 0: # 當該box有覆蓋時就繪製一層白色的覆蓋
            pygame.draw.rect(DISPLAYSURF, BOXCOLOR, (left, top, coverage, BOXSIZE))
            
    # 更新屏幕        
    pygame.display.update()
    # 設置影格率
    FPSCLOCK.tick(FPS)        
        

# 顯示揭開的動畫     
def revealBoxesAnimation(board, boxesToReveal):
    # Do the "box reveal" animation.
    for coverage in range(BOXSIZE, (-REVEALSPEED) - 1, - REVEALSPEED):
        drawBoxCovers(board, boxesToReveal, coverage)


# 顯示覆蓋的動畫
def coverBoxesAnimation(board, boxesToCover):
    # Do the "box cover" animation.
    for coverage in range(0, BOXSIZE + REVEALSPEED, REVEALSPEED):
        drawBoxCovers(board, boxesToCover, coverage)



# 繪製Board
def drawBoard(board, revealed):
    # 根據所有的box的狀態(覆蓋/揭開)繪製對應的box
    for boxx in range(BOARDWIDTH):
        for boxy in range(BOARDHEIGHT):
            left, top = leftTopCoordsOfBox(boxx, boxy)
            if not revealed[boxx][boxy]:
                # 繪製一個被覆蓋的box
                pygame.draw.rect(DISPLAYSURF, BOXCOLOR, (left, top, BOXSIZE, BOXSIZE))
            else:
                # 繪製一個揭開的圖標
                shape, color = getShapeAndColor(board, boxx, boxy)
                drawIcon(shape, color, boxx, boxy)



# 遊戲的開場動畫
def startGameAnimation(board):
    # 一次隨機獲得8個box顯示
    coveredBoxes = generateRevealedBoxesData(False)
    boxes = []
    for x in range(BOARDWIDTH):
        for y in range(BOARDHEIGHT):
            boxes.append( (x, y) )
            
    random.shuffle(boxes)
    # 將上面的结果以8個為一組的分組
    boxGroups = splitIntoGroupsOf(8, boxes)
    
    drawBoard(board, coveredBoxes)


    # 對每一组的元素都進行，先揭開再覆蓋的動畫
    for boxGroup in boxGroups:
        revealBoxesAnimation(board, boxGroup)
        coverBoxesAnimation(board, boxGroup)
    


# 遊戲獲勝的動畫
def gameWonAnimation(board):

    coveredBoxes = generateRevealedBoxesData(True)
    
    color1 = LIGHTBGCOLOR
    color2 = BGCOLOR

    # 閃動背景顏色
    for i in range(9):
        color1, color2 = color2, color1 # 交換顏色
        DISPLAYSURF.fill(color1)
        # 顯示所有的box
        drawBoard(board, coveredBoxes)
        pygame.display.update()
        pygame.time.wait(300)


# 判斷遊戲是否獲勝
def hasWon(revealedBoxes):
    # 當所有的box都被揭開時，遊戲才獲勝，否則返回False
    for i in revealedBoxes:
        if False in i:
            return False 
    return True



def main():
    
    
    global FPSCLOCK, DISPLAYSURF# 定義全局變量
    
    mousex = 0 # 表示滑鼠的x座標
    mousey = 0 # 表示滑鼠的y座標

    
    pygame.init()# 初始化pygame
    
    FPSCLOCK = pygame.time.Clock()# 獲得pygame時鐘
    
    DISPLAYSURF = pygame.display.set_mode((WINDOWWIDTH, WINDOWHEIGHT))# 設置視窗大小

    fontObj =  pygame.font.SysFont('comicsans',60,True)# 定義字型
    fontSmallObj =  pygame.font.SysFont('comicsans',30,True)# 定義字型

    pressEnterSurfaceObj = fontObj.render('Press enter to start', True, WHITE , BLACK)# 顯示Round One

    pressEnterRectObj = pressEnterSurfaceObj.get_rect()# 獲得要顯示的對象的rect

    pressEnterRectObj.center = (245, 220)# 設置顯示對象的座標

    DISPLAYSURF.fill(BGCOLOR)# 設置背景

    DISPLAYSURF.blit(pressEnterSurfaceObj, pressEnterRectObj)# 繪製字體

    pygame.display.update()

    while True:
        event = pygame.event.poll()
        if(event.type == KEYDOWN and event.key == K_RETURN):
            break


    textSurfaceObj = fontObj.render('Round One', True, WHITE , BLACK)# 顯示Round One

    textRectObj = textSurfaceObj.get_rect()# 獲得要顯示的對象的rect

    textRectObj.center = (245, 60)# 設置顯示對象的座標
    

    COUNT = pygame.USEREVENT +1# 每隔一秒發送一次自定義的計時事件

    pygame.display.set_caption('Obstacle Game')# 設置標題

    mainBoard = getRandomizedBoard()# 隨機獲得board的狀態
    
    revealedBoxes = generateRevealedBoxesData(False)# 生成一個數據結構，用來存放已經找到匹配的box

    firstSelection = None # 紀錄第一個被點擊的box的座標(x, y)

    DISPLAYSURF.fill(BGCOLOR)# 設置背景

    DISPLAYSURF.blit(textSurfaceObj, textRectObj)# 繪製字體

    pygame.display.update()

    
    startGameAnimation(mainBoard)# 開始開場動畫

    counts =35# 初始秒數為35
    score = 30# 初始分數為30
    is_win = False
    first_click = True
    showText(fontSmallObj,'30',455,50)# 顯示初始秒數
    showText(fontObj,str(counts),245,425)# 顯示初始分數
    
    while True: # 遊戲主循環
        
        mouseClicked = False# 鼠標點擊狀態
        
        # 事件處理
        for event in pygame.event.get(): 
            
            # 按下ESC鍵或者點擊關閉，就退出程序
            if event.type == QUIT or (event.type == KEYDOWN and event.key == K_ESCAPE):
                pygame.quit()
                sys.exit()
            
            # 鼠標移動時紀錄鼠標位置    
            elif event.type == MOUSEMOTION:
                mousex, mousey = event.pos
            
            # 鼠標點擊時紀錄點擊位置，並把點及狀態設置為True    
            elif event.type == MOUSEBUTTONUP:
                mousex, mousey = event.pos    
                mouseClicked = True
                if first_click == True:
                    pygame.time.set_timer(COUNT,1000)
                    first_click = False
                    
            # 判斷事件是否為計時事件       
            elif event.type == COUNT:
            
                counts = counts -1# 開始倒數
            
                countstext=str(counts)

                r = pygame.Rect(180,380,300,100)
                DISPLAYSURF.fill(BLACK, r)
                
                if counts == 0:# 時間歸零重新開始
                    pygame.time.set_timer(COUNT,0)
                    showText(fontObj,'GAMEOVER',245,425)
    
                    pygame.display.set_caption('Obstacle Game')

                    mainBoard = getRandomizedBoard()
                    
                    revealedBoxes = generateRevealedBoxesData(False)

                    firstSelection = None 

                    DISPLAYSURF.fill(BGCOLOR)

                    DISPLAYSURF.blit(textSurfaceObj, textRectObj)
                    
                    startGameAnimation(mainBoard)
                    
                    counts = 35
                    
                    score = 30
                    
                    is_win = False
                    
                    first_click = True
                    
                    showText(fontSmallObj,'30',455,50)
                    
                    showText(fontObj,str(counts),245,425)
                    
                elif not is_win:
                    showText(fontObj,countstext,245,425)
                elif is_win:
                    
                    #進入第二關
                    win=pygame.display.set_mode((500,500))
                    
                    class player():
                        def __init__(self,x,y,width,height,vel):
                            self.x=x
                            self.y=y
                            self.width=width
                            self.height=height
                            self.vel=vel
                            self.jumpCount=80
                            self.isJump=False
                            self.yflag=0
                            self.score=0
                            self.hitbox=(self.x,self.y,self.width,self.height)
                            self.difficulty=6
                        #畫出玩家，包含只有框線的hitbox以及玩家的體積
                        def draw_player(self):
                            self.hitbox=(self.x,self.y,self.width,self.height)
                            pygame.draw.rect(win,(255,0,0),(self.x,self.y,self.width,self.height))
                            pygame.draw.rect(win,(255,255,255),self.hitbox,1)
                    class gold():
                        def __init__(self):
                            self.randomXpos=random.randint(0,470)    
                            self.randomYpos=random.randint(50,350)
                            self.xpos=-20
                            self.ypos=-20
                            self.move=random.randint(3,8)
                            self.hitboxV=(self.randomXpos,self.ypos,30,30)
                            self.hitboxH=(self.xpos,self.randomYpos,30,30)

                        #分別畫出垂直、水平移動的掉落物
                        def draw_vertical(self,win):
                            self.hitboxV=(self.randomXpos,self.ypos,30,30)
                            pygame.draw.rect(win,(0,250,0),(self.randomXpos,self.ypos,30,30),1)
                            
                        def draw_horizontal(self,win):
                            self.hitboxH=(self.xpos,self.randomYpos,30,30)
                            pygame.draw.rect(win,(0,250,0),(self.xpos,self.randomYpos,30,30),1)

                    #畫出遊戲過程中的所有畫面
                    def reDrawWindow(win):
                        win.fill((0,0,0))
                        for objH in horizontal:
                            objH.draw_horizontal(win)
                        for objV in vertical:
                            objV.draw_vertical(win)
                        text=font.render('score:'+str(a.score),1,(250,250,250))

                        win.blit(text,(360,10))
                              
                        a.draw_player()
                        pygame.display.update()

                    font=pygame.font.SysFont('comicsans',30,True)
                    fontObj =  pygame.font.SysFont('comicsans',60,True)
                    run=True
                    end=True
                    start=True
                    a=player(240,480,20,20,2)
                    horizontal=[]
                    vertical=[]
                                                



                    #開始畫面
                    while start:
                        for event in pygame.event.get():
                            if event.type==pygame.QUIT:
                                start=False
                                run=False
                                end=False
                        text=font.render("press 'space' to start",1,(250,250,250))
                        text_2=fontObj.render("Round Two",1,(250,250,250))
                        win.blit(text,(120,240))
                        win.blit(text_2,(120,60))
                        pygame.display.update()
        
                        keys=pygame.key.get_pressed()
                        if keys[pygame.K_SPACE]:
                            start=False


                    #遊戲過程
                    while run:
                        pygame.time.delay(5)
            
                        #遊戲歷程
                        if a.score==20:
                            a.difficulty=6.5
                        if a.score==40:

                            a.difficulty=7
                        if a.score==80:
                            a.difficulty=7.5
                        if a.score==120:
                            a.difficulty=8
                        if a.score==140:
                            break

                       
                        #新增掉落物
                        if len(horizontal)<2:
                            horizontal.append(gold())
                        if len(vertical)<2:
                            vertical.append(gold())

                        #掉落物移動、檢驗掉落物是否與玩家hitbox接觸
                        for objH in horizontal:
                            
                            if objH.xpos<500 and objH.xpos>=-20:
                                objH.xpos+=objH.move*0.015*a.difficulty
                            else:
                                horizontal.pop(horizontal.index(objH))
                                a.score-=10
                                
                            if a.x > objH.hitboxH[0]-20 and a.x<objH.hitboxH[0]+50 and a.y>objV.hitboxV[1]-10 and a.y<objV.hitboxV[1]+40:
                                    horizontal.pop(horizontal.index(objH))
                                    a.score+=5
                                
                        for objV in vertical:

                            if objV.ypos<500 and objV.ypos>=-20:
                                objV.ypos+=objV.move*0.010*a.difficulty+0.01
                            else:
                                vertical.pop(vertical.index(objV))
                                a.score-=10
    
                            if a.x>objV.hitboxV[0]-60 and a.x<objV.hitboxV[0]+40 and a.y>objV.hitboxV[1]-10 and a.y<objV.hitboxV[1]+40:
                                vertical.pop(vertical.index(objV))
                                a.score+=5
    
        
    
                        #玩家控制的反饋   
                        for event in pygame.event.get():
                            if event.type==pygame.QUIT:
                                run=False
                                end=False
            
                        keys=pygame.key.get_pressed()

                        if keys[pygame.K_LEFT] and a.x >= a.vel:
                            a.x -= a.vel*0.8
                        if keys[pygame.K_RIGHT] and a.x <500-a.width:
                            a.x += a.vel*0.8
        
                        if a.y==480:  
                            if keys[pygame.K_DOWN]:
                                a.y = 0
                                a.yflag=1
        
                        if a.y==0:
                            if keys[pygame.K_UP]:
                                a.y=480
                                a.yflag=0
            
                            #空白鍵跳躍，分成往上跳以及往下跳處理                
                        if not (a.isJump):           
                            if keys[pygame.K_SPACE]:
                                a.isJump=True
    
                        else: 
                            if a.jumpCount>=-80 and a.yflag==0:
                                if a.jumpCount>0:
                                    a.y-=a.jumpCount**2*0.0015
                                    a.jumpCount-=1
                                else:
                                    a.y-=a.jumpCount**2*0.0015*-1
                                    a.jumpCount-=1
                
                            if a.jumpCount<-80:
                                a.y=a.y//1
                                a.isJump=False
                                a.jumpCount=80
            
                            if a.jumpCount>=-80 and a.yflag==1:
                                if a.jumpCount>0:
                                    a.y-=a.jumpCount**2*0.0015*-1
                                    a.jumpCount-=1
                                else:
                                    a.y-=a.jumpCount**2*0.0015
                                    a.jumpCount-=1

                            if a.jumpCount<-80:
                                a.y=int(a.y//1+1)
                                a.isJump=False
                                a.jumpCount=80


                        reDrawWindow(win)

                    #勝利畫面
                    while end:
                        pygame.time.wait(1000)
                        pygame.display.update()

                        for event in pygame.event.get():
                            if event.type==pygame.QUIT:
                                end=False
                        
                        #進入第三關        
                        SCREEN_WIDTH = 500
                        SCREEN_HEIGHT = 500
                        SIZE = 20


                        def print_text(screen, font, x, y, text, fcolor=(255, 255, 255)):
                            imgText = font.render(text, True, fcolor)
                            screen.blit(imgText, (x, y))


                        def main():
                            pygame.init()
                            screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
                            
                            #定義顏色
                            snake_color = (0, 0, 255)
                            berry_color = (0, 255, 0)   
                            poison_color = (255,0,0)
                            snack_color = (255,255,0)
                            red = (200, 30, 30)
                            line_width = 1                      
                            black = (0, 0, 0)
                            white = (255, 255, 255)
                            bgcolor = (40, 40, 60)   
                            #定義字型
                            font1 = pygame.font.SysFont('SimHei',54)  
                            font2 = pygame.font.Font(None, 72)  
                            fwidth, fheight = font2.size('GAME OVER')
                                        

                            #蛇的原始方向
                            pos_x = 1
                            pos_y = 0
                            b = True
                            #規範蛇走的範圍
                            scope_x = (0, SCREEN_WIDTH // SIZE - 1)
                            scope_y = (2, SCREEN_HEIGHT // SIZE - 1)
                            snake = deque()
                            #蛇的原始位置與各種果實個數
                            berry_x = 0
                            berry_y = 0
                            poison_x = 0
                            poison_y = 0
                            snack_x = 0
                            snack_y = 0

                            #定義蛇
                            def _init_snake():
                                nonlocal snake
                                snake.clear()
                                snake.append((2, scope_y[0]))
                                snake.append((1, scope_y[0]))
                                snake.append((0, scope_y[0]))

                            #定義綠果實
                            def create_food():
                                nonlocal berry_x, berry_y
                                berry_x = random.randint(scope_x[0], scope_x[1])
                                berry_y = random.randint(scope_y[0], scope_y[1])
                                while (berry_x, berry_y) in snake:
                                    berry_x = random.randint(scope_x[0], scope_x[1])
                                    berry_y = random.randint(scope_y[0], scope_y[1])
                            #定義紅果實 
                            def create_poison():
                                nonlocal poison_x, poison_y
                                poison_x = random.randint(scope_x[0], scope_x[1])
                                poison_y = random.randint(scope_y[0], scope_y[1])
                                while (poison_x, poison_y) in snake or (poison_x == berry_x and poison_y == berry_y) or (poison_x == snack_x and poison_y == snack_y):
                                    poison_x = random.randint(scope_x[0], scope_x[1])
                                    poison_y = random.randint(scope_y[0], scope_y[1])

                            #定義黃果實     
                            def create_snack():
                                nonlocal snack_x, snack_y
                                snack_x = random.randint(scope_x[0], scope_x[1])
                                snack_y = random.randint(scope_y[0], scope_y[1])
                                while (snack_x, snack_y) in snake or (snack_x == berry_x and snack_y == berry_y) or (poison_x == snack_x and poison_y == snack_y):
                                    snack_x = random.randint(scope_x[0], scope_x[1])
                                    snack_y = random.randint(scope_y[0], scope_y[1])
                            #創建蛇與果實
                            _init_snake()
                            create_food()
                            create_poison()
                            create_snack()

                            game_over = True
                            start = False  
                            win = False    
                            score = 0 #得分         
                            orispeed = 0.2 #原始速度     
                            speed = orispeed
                            last_move_time = None
                            pause = False 
                           

                            while True:
                                for event in pygame.event.get():
                                    if event.type == QUIT:
                                        sys.exit()
                                    elif event.type == KEYDOWN: #鍵盤控制蛇
                                        if event.key == K_RETURN:
                                            if game_over:
                                                start = True
                                                game_over = False
                                                b = True
                                                _init_snake()
                                                create_food()
                                                create_poison()
                                                create_snack()
                                                pos_x = 1
                                                pos_y = 0
                                                score = 0
                                                last_move_time = time.time()
                                        elif event.key == K_SPACE: #空白鍵暫停
                                            if not game_over:
                                                pause = not pause
                                        elif event.key in (K_w, K_UP): #向上
                                            if b and not pos_y:
                                                pos_x = 0
                                                pos_y = -1
                                                b = False
                                        elif event.key in (K_s, K_DOWN): #向下
                                            if b and not pos_y:
                                                pos_x = 0
                                                pos_y = 1
                                                b = False
                                        elif event.key in (K_a, K_LEFT): #向左
                                            if b and not pos_x:
                                                pos_x = -1
                                                pos_y = 0
                                                b = False
                                        elif event.key in (K_d, K_RIGHT): #向右
                                            if b and not pos_x:
                                                pos_x = 1
                                                pos_y = 0
                                                b = False

                                #畫網格
                                screen.fill(bgcolor)
                                for x in range(SIZE, SCREEN_WIDTH, SIZE):
                                    pygame.draw.line(screen, black, (x, scope_y[0] * SIZE), (x, SCREEN_HEIGHT), line_width)
                                for y in range(scope_y[0] * SIZE, SCREEN_HEIGHT, SIZE):
                                    pygame.draw.line(screen, black, (0, y), (SCREEN_WIDTH, y), line_width)

                                if game_over: #輸的情況
                                    if start:
                                        print_text(screen, font2, (SCREEN_WIDTH - fwidth)//2, (SCREEN_HEIGHT - fheight)//2, 'GAME OVER', red)
                                    else: #一開始畫面
                                        print_text(screen, font1, 130, 210, 'Round Three', white)
                                        print_text(screen, font1, 70, 250,"press 'enter' to start",white)
                                elif win: #贏的情況
                                    if start:
                                        screen.fill(black)
                                        screen.blit(screen, (0,0))
                                        print_text(screen, font1, 190, 230, '1/11',red)
                                        print_text(screen, font1, 110, 270, 'Vote for Taiwan!',red)
                                        
                                        
                                else:
                                    curTime = time.time()
                                    if curTime - last_move_time > speed:
                                        if not pause:
                                            b = True
                                            last_move_time = curTime
                                            next_s = (snake[0][0] + pos_x, snake[0][1] + pos_y) #按鍵盤後蛇的下一步
                                            
                                            if next_s[0] == berry_x and next_s[1] == berry_y: #吃到綠果實
                                                create_food()
                                                snake.appendleft(next_s)
                                                score += 10
                                                speed = orispeed - 0.03 * (score // 100)
                                                if score >= 100:
                                                    win = True
                                            elif next_s[0] == poison_x and next_s[1] == poison_y: #吃到紅果實
                                                create_poison()
                                                snake.pop()
                                                score -= 10
                                                if score < 0:
                                                    game_over = True
                                                speed = orispeed - 0.03 * (score // 100)
                                            elif next_s[0] == snack_x and next_s[1] == snack_y: #吃到黃果實
                                                create_snack()
                                                snake.appendleft(next_s)
                                                snake.appendleft(next_s)
                                                score += 20
                                                speed = orispeed - 0.03 * (score // 100)
                                                if score >= 100:
                                                    win = True
                                            else:
                                                if scope_x[0] <= next_s[0] <= scope_x[1] and scope_y[0] <= next_s[1] <= scope_y[1] and next_s not in snake:
                                                    snake.appendleft(next_s)
                                                    snake.pop()
                                                else:
                                                    game_over = True

                                if not game_over and not win: #畫果實顏色
                                    pygame.draw.rect(screen, berry_color, (berry_x * SIZE, berry_y * SIZE, SIZE, SIZE), 0)
                                    pygame.draw.rect(screen, poison_color, (poison_x * SIZE, poison_y * SIZE, SIZE, SIZE), 0)
                                    pygame.draw.rect(screen, snack_color, (snack_x * SIZE, snack_y * SIZE, SIZE, SIZE), 0)
                                    for s in snake: #畫蛇顏色
                                        pygame.draw.rect(screen, snake_color, (s[0] * SIZE + line_width, s[1] * SIZE + line_width,
                                                                    SIZE - line_width * 2, SIZE - line_width * 2), 0)
                                    print_text(screen, font1, 30, 7, f'speed:{score//10}') #顯示速度
                                    print_text(screen, font1, 300, 7, f'score:{score}') #顯示分數

                                pygame.display.update()


                        if __name__ == '__main__':
                            main()


                            

    
                    pygame.quit()


                    
        
        #通過鼠標的x,y值獲得對應的box的x,y(也就是鼠標所指的box)
        boxx, boxy = getBoxAtPixel(mousex, mousey)
        
        
        if boxx != None and boxy != None:
            
            # 鼠標停在一个box的上面，並且已經點擊了該box
            if not revealedBoxes[boxx][boxy] and mouseClicked:
                revealBoxesAnimation(mainBoard, [(boxx, boxy)])# 動畫
                revealedBoxes[boxx][boxy] = True # 相當於將這個box存入revealed中
                
                if firstSelection == None: # 如果第一個被典籍的box為空，就把當前的box設為第一個點擊的box
                    firstSelection = (boxx, boxy) 
                else: 
                    # 如果當前的box是第二次被典籍的box
                    
                    # 檢查他與第一次被典籍的box是否匹配
                    
                    icon1shape, icon1color = getShapeAndColor(mainBoard, firstSelection[0], firstSelection[1])# 獲得第一次被點擊的box的形狀和顏色
                    
                    icon2shape, icon2color = getShapeAndColor(mainBoard, boxx, boxy)# 獲得當前被點擊的box的形狀和顏色

                    score += 3
                    
                    if icon1shape != icon2shape or icon1color != icon2color:# 如果形狀或顏色不匹配

                        score -= 4
                        
                        pygame.time.wait(300) # 等待300毫秒
                        
                        coverBoxesAnimation(mainBoard, [(firstSelection[0], firstSelection[1]), (boxx, boxy)])# 把這兩個box都覆蓋回去
                        
                        revealedBoxes[firstSelection[0]][firstSelection [1]] = False# 相當於把第一個box從revealed裡拿出
                        
                        revealedBoxes[boxx][boxy] = False# 相當於把當前的box從revealed裡拿出
                        
                    elif hasWon(revealedBoxes): # 判斷是否獲勝
                        
                        gameWonAnimation(mainBoard)

                        pygame.time.set_timer(COUNT,0)
                        is_win = True

                    scoreText = str(score)
                    r = pygame.Rect(430,40,100,100)
                    DISPLAYSURF.fill(BLACK, r)
                    showText(fontSmallObj,scoreText,455,50) 
                    firstSelection = None #不管匹配不匹配，都重新設置第一個被點擊的box為None
                       
                        
        # 更新屏幕
        pygame.display.update()
        # 設置影格率
        FPSCLOCK.tick(FPS)                
                    
                                   


if __name__ == '__main__':
    main()

        
