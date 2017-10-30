<template>
  <div id="app">
    <div class="header">
	   <h1>todos</h1>
	   <input type="text" class="text1"  placeholder="What needs to be done?" @keyup.13='addList' v-model="addText"/>			
	</div>

    
    <div class="main">
	<ul class="todo-list">
		<li v-for="(list1,index) in useList"  v-bind:key="list1.id" v-bind:class="{end:list1.done,eidting:edit===list1}">
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
           <span> 共有{{allList.length}}个目标，{{number==0?"全部完成了":'已完成'+(allList.length-number)}}{{number==0? "":' ,还有'+number+'条未完成'}} </span>         
           <ul class="filters">
            <li><a href=""><input type="radio" name="radio1" value="one" v-model="radio" @click="chooseList(1)">All</a></li>
            <li><a href=""> <input type="radio" name="radio2" value="two" v-model="radio" @click='chooseList(2)'/>Completed</a></li>
            <li><a href=""><input type="radio" name="eadio3" value="three"  v-model="radio" @click='chooseList(3)'/>Active</a></li>
          </ul>
    </div>
  
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--加了scoped的只对当前页起作用，若不加scoped话将对全部的页面都气作用-->
<style scoped>

*{
			padding:0;
			margin:0;
		}
		body{
			font-family: "微软雅黑";
			font-size: 14px;
            background-color:#f5f5f5;
            margin:0 auto;
            color: #4d4d4d;
            font-weight: 300;
            line-height: 1.4em;
            min-width: 230px;
            max-width: 550px;
		}
  
        #app {
            background: #fff;
            margin: 130px 0 40px 0;
            position: relative;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                0 25px 50px 0 rgba(0, 0, 0, 0.1);
         }

         #app input::-webkit-input-placeholder{
            font-style: italic;
            font-weight: bold;
            color: #e6e6e6;
         }

         #app h1{
            position: absolute;
            top: -80px;
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
  /*      .todo-list li:hover{
        	border: 1px solid #09f;
        }*/
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

       .filters {
        margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        right: 0;
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
