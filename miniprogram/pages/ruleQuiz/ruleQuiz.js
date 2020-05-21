// ruleQuiz/ruleQuiz.js
const db = wx.cloud.database()
const _ =db.command
Page({
  
  /**
   * Page initial data
   */
  data: {
    nextQuestion:"下一题",
    result:"",
    index:0,
    correct:1,
    wrong:1,
    score:0,
    lookResult:0,
    questions:[],
    options:[],
    answers:[],


    pictures:[],
    picPath:"cloud://vexnews-f53mu.7665-vexnews-f53mu-1302123540/quizPics/1.jpg",
    status:""
   

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    
    let quiz = await db.collection("quiz")
    .get()

    let quizData = quiz.data
    for (let i = 1; i < quizData.length; i++) {
      const random = Math.floor(Math.random() * (i + 1));
      [quizData[i], quizData[random]] = [quizData[random], quizData[i]];
    }


    console.log(quiz);

    quizData.forEach(element => {
      this.setData({
        questions:this.data.questions.concat(element.question),
        options:this.data.options.concat(element.options),
        answers:this.data.answers.concat(element.answer),
        pictures:this.data.pictures.concat(element.picture)
      })
    });
   console.log(this.data.questions)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  update(){
    this.setData({
      index:this.index+1,
      picPath:"cloud://vexnews-f53mu.7665-vexnews-f53mu-1302123540/quizPics/"+this.data.pictures[this.data.index]+".jpg"
    })
  },


  choose0(event1) {
    if(this.data.options[this.data.index*4]==this.data.answers[this.data.index]){
      this.setData({
        score:this.data.score+5,
      })
    }
    this.update()
  },

  choose1(event1) {
    if(this.data.options[this.data.index*4+1]==this.data.answers[this.data.index]){
      this.setData({
        score:this.data.score+5,
      })
    }
    this.update()
  },

  choose2(event1) {
    if(this.data.options[this.data.index*4+2]==this.data.answers[this.data.index]){
      this.setData({
        score:this.data.score+5,
      })
    }
    this.update()
    
  },

  choose3(event) {
    if(this.data.options[this.data.index*4+3]==this.data.answers[this.data.index]){
      this.setData({
        score:this.data.score+5,
      })
    }
    this.update()
  },

  next(){
    if(this.data.index<this.data.questions.length-1){
    this.setData({
      index: this.data.index+1,
      status:"",
      nextQuestion:"下一题"
    })
   } 
   else if(this.data.index==this.data.questions.length-1&&this.data.lookResult==0){
    this.setData({
      nextQuestion:"查看结果",
      lookResult:1
    })
   } else{
    this.setData({
      lookResult:0
    })
    
    if(this.data.correct-this.data.wrong>5){
    this.setData({
      result:"恭喜！看上去你已经很了解规则了"
    })
  }  else if(this.data.correct-this.data.wrong>0){
    this.setData({
      result:"恭喜！看上去你对规则掌握的还不错"
    })} else{
      this.setData({
      result:"恭喜完成！但你看上去还需要再多研究研究规则"
      })
    }
  
   }
   this.update()
  },

  last(){  
  if(this.data.index>0){
    this.setData({
      index: this.data.index-1,
      status:"",
      nextQuestion:"下一题",
      result:""
    })
  }
  this.update()
  },

  clickImg: function(e){
    var imgUrl = this.data.picPath;
    wx.previewImage({
      urls: [imgUrl], 
      current: '', 
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }




})