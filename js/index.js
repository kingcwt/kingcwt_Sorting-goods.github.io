~(function () {
    //==>渲染数据
    let xhr=new XMLHttpRequest();
    xhr.open('GET','json/list.json',false);
    xhr.onreadystatechange=function () {
        if(xhr.readyState===4&&xhr.status===200){
           let result=xhr.responseText;
           window.result=JSON.parse(result);
        }
    };
    xhr.send(null);
        let Oul=document.getElementsByClassName('listUl')[0];
        let str=``;
    window.result.forEach(item=>{
        str+=` <li data-price=${item.price} data-comment=${item.comment} data-time=${item.time}>
        <div class="li_div">
            <img src="${item.img}" alt="">
            <span>${item.confidence}</span>
            <b>¥${item.price}</b>
            <div class="div_div">
                <a href="" class="__a"><p>${item.comment}人评价</p></a>
                <p class="__p">选购</p>
            </div>
        </div>
    </li>`
    });
   Oul.innerHTML=str;
})();
~(function () {
    //==>升降序的切换
    var headerBox=document.getElementsByClassName('head')[0];
    var headerUl=headerBox.getElementsByClassName('head_ul')[0];
    var oLi1=headerUl.getElementsByTagName('li');
    var S=document.getElementsByTagName('s');
    for(var i=0;i<oLi1.length;i++){
        oLi1[i].myIndex=i;
        oLi1[i].myMethods=-1;
        oLi1[i].onclick=function () {
            this.myMethods*=-1;
            changePosition.call(this);
        }
    }
  function changePosition() {
      //==>细节优化   保证每一次点击的排序都是从升序开始
      for(var k=0;k<S.length;k++){
          k===this.myIndex?oLi1[k].style.color='red':oLi1[k].style.color='green';
          k===this.myIndex&&this.myMethods===1?S[k].className='select_top':null;
          k===this.myIndex&&this.myMethods===-1?S[k].className='select_bottom':null;
          console.log(this.myMethods);
          if(k!==this.myIndex){
              S[k].className="_s";
              oLi1[k].myMethods=-1;
              oLi1[k].style.color='green';
          }
      }
      var oUl=document.getElementsByClassName('listUl')[0];
      var oLi=oUl.getElementsByTagName('li');
      var ary=Array.prototype.slice.call(oLi);
      ary.sort((a,b)=>{
          var index=this.myIndex;
          var attr='';
          switch (index){
              case 0:
                  attr='data-price';
                  break;
              case 1:
                  attr='data-comment';
                  break;
              case 2:
                  attr='data-time';
                  break;
          }
          var cur=a.getAttribute(attr);
          var next=b.getAttribute(attr);
          if(index===2){
              cur=cur.replace(/-/g,'');
              next=next.replace(/-/g,'');
          }
          return (cur-next)*this.myMethods;
      });
      var frg=document.createDocumentFragment();
      for(var i=0;i<ary.length;i++){
          frg.appendChild(ary[i])
      }
      oUl.appendChild(frg);
      frg=null;
  }
})();
