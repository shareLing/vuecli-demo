<template>
 <div id="todoList">
    <div class="header">
	   <h1>todos</h1>
	   <input type="text" class="text1"  placeholder="What needs to be done?" @keyup.13='addList' v-model="addText"/>			
	</div>

  <div class="main">
	<ul class="todo-list">
		<li v-for="(list1,index) in useList" v-bind:class="{end:list1.done,eidting:edit===list1}" v-bind:key="list1.id">
			<div class="view">
			    <span @click="list1.done=!list1.done" class="select"></span>
                <span @dblclick="edit=list1">{{list1.name}}</span>
				<span @click="deleteList(index)" class="close">X</span>
			</div>
			 <input type="text" class="text2" v-model='list1.name'  @blur='edited' @focus='saveEditBefore(list1.name)' @keyup.enter='edited' v-focus/>
		</li>
	</ul>
    </div>

   <div class="footer">
           <span> 共{{allList.length}}个目标，{{number==0?"全部完成了":'已完'+(allList.length-number)}}{{number==0? "":' ,还有'+number+'个未完成'}} </span>         
           <ul class="filters">
            <li><a href=""><input type="radio" name="radio1" value="one" v-model="radio" @click="chooseList(1)">All</a></li>
            <li><a href=""> <input type="radio" name="radio2" value="two" v-model="radio" @click='chooseList(2)'/>Completed</a></li>
            <li><a href=""><input type="radio" name="eadio3" value="three"  v-model="radio" @click='chooseList(3)'/>Active</a></li>
          </ul>
           <button class="clear-completed" @click="removeCompleted" v-show="allList.length-number>0">
          Clear completed
          </button>
    </div>
 </div>
</template>
<script>

export default {

  name: 'TodoList',
  computed:{
            //未完成的目标的个数
            number:function(){
                return this.allList.filter(function(its){
                return !its.done
            }).length;
                  //  console.log(item.type);
                }
            },
  data(){
  var list=[
  {name:"HTML5",done:false},
  {name:"CSS3",done:false},
  {name:"vue",done:false},
  {name:"react",done:false}
  ];
    return{
    allList:list,
    addText:"",
    useList:list,
    edit:'',
    beforeEditText:"",
    radio:'one',
    filter:1
    }
    
  },
  methods: {
     //添加
    addList(){
    if(this.addText===""){
         return;
    }
    this.allList.push({
       name:this.addText,
       done:false
    });
      this.addText="";
      this.chooseList(this.filter);
    },
    //选择状态
    chooseList(state){
       this.filter=state;
       //所有目标
         if(state===1){
              this.useList=this.allList
          }
       //已完成的目标
         else if(state===2){
               this.useList=this.allList.filter(function(its){return its.done});
           }
       //未完成的目标
          else{
               this.useList=this.allList.filter(function(its){return !its.done});
           }
    },
    //删除
     deleteList(index){
         this.allList.splice(index,1);
     },
       
     //完成修改后，把edit设为空后，添加的eidting类就会失效
    edited(){
          this.edit='';
    },
    //保存修改前的内容
    saveEditBefore(btext){
        this.beforeEditText=btext;
     },
    //清除已完成的
    removeCompleted: function () {
        this.useList = this.allList.filter(function(its){return !its.done});
        this.allList = this.allList.filter(function(its){return !its.done});
    }

     
  },
  //自定义指令
  directives:{
    "focus":{
        update(el){
        el.focus();
        }
    }
  }
}
</script>
<style scoped>
		*{
			padding:0;
			margin:0;
		}
  
        #todoList {
            min-width: 260px;
            max-width: 600px;
            background: #fff;
            margin:0 auto;
            position: relative;
            margin-top:150px;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                0 25px 50px 0 rgba(0, 0, 0, 0.1);
         }

         #todoList input::-webkit-input-placeholder{
            font-style: italic;
            font-weight: bold;
            color: #e6e6e6;
         }

         #todoList h1{
            position: absolute;
            top: -120px;
            width: 100%;
            font-size: 100px;
            font-weight: 300;
            text-align: center;
            color: red;

         }
        .text1,.text2{
            position: relative;
            margin: 0;
            width: 100%;
            font-size: 25px;
            line-height: 1.4em;
            border:0;
        	outline: none;
            color: #e6e6e6;
            padding:6px;
            border:1px solid #999;
            box-shadow: inset 0 -1px 5px 0 #eee;
        	box-sizing: border-box;
        }

        .text1{
            padding:16px 16px 16px 60px;
            border:none;
            background-color: white;
        }

        .main{
            position: relative;
            z-index: 2;
            border-top:1px solid #e6e6e6;
        }
        
        .todo-list{
            margin:0;
            padding:0;
            list-style: none;
        }

        .todo-list li{
            position: relative;
            font-size: 25px;
        	line-height: 40px;
        	position: relative;
        	border: 1px solid #ccc;
        	padding: 0 20px;
            padding:12px 12px 12px 15px;
        }

        .todo-list li:last-child {
         border-bottom: none;
        }

        .todo-list li.editing {
         border-bottom: none;
         padding: 0;
        }

        .todo-list li.editing .edit {
            display: block;
             width: 506px;
             padding: 13px 17px 12px 17px;
             margin: 0 0 0 43px;
        }

        .todo-list li.editing .view {
            display: none; 
        }

        .todo-list li .select{
         	display: block;
         	width: 20px;
         	height: 20px;
         	background: #ccc;
            border-radius: 50%;
         	margin: 14px 10px 0 0 ;
         	float: left;
         }

        .todo-list li.end .select{
        	background: green;
        }

        .end{
            text-decoration: line-through;
            color: #ccc;
        }

        .todo-list li .close{
        	position: absolute;
        	color: red;
        	font-size: 20px;
        	line-height: 40px;
        	right: 20px;
            font-weight: bold;
        	cursor: pointer;
        	display: none;
        	top: 12px;
        }

        .todo-list li:hover .close{
        	display: block;
        }
        .todo-list li .text2{
        	height: 40px;
        	line-height: 40px;
        	padding-left: 10px;
        	box-sizing: border-box;
        	margin-left: 10px;
        	width: 80%;
        	display: none;
        }
        .todo-list li.eidting .text2{
        	display: block;
        }

        .footer {
         color: #777;
         padding: 10px 5px;
         height: 30px;
         line-height: 30px;
         border-top: 1px solid #e6e6e6;
         position: relative;
       }
       
       .footer span{
           position: absolute;
           left: 5px;
       }

       .footer .clear-completed{
       	position: absolute;
       	right:5px;
       	color: #777;
       	margin-top: 3px;
       	line-height: 20px;
       }

       .filters {
        margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        right:100px;
        bottom: 11px;
        }
  

        .filters li {
         display: inline;
         }



        .filters li a {
         color: inherit;
         margin: 3px;
         padding: 3px 7px;
         text-decoration: none;
         border: 1px solid transparent;
         border-radius: 3px;
        }

        .filters li a.selected,
        .filters li a:hover {
         border-color: #ccc;
        }
</style>