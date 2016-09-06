(function() {

var photoslider = {};
photoslider.bindButton_Count = 0;

$(window).scroll(function(event){
if(photoslider.scrollFunc_Exsist == 1){
    $(window).scrollLeft(0);
    $(window).scrollTop(0);

}
});
photoslider.ifmove =0;
$(window).mousemove(function(e){
   photoslider.ifmove = 1;
 if(photoslider.mousedown_Lock == 1 &&photoslider.scrollFunc_Exsist == 1 &&e.target.id=="PhotoSlider_NameSpace_Img_Mask_Node"){
   photoslider.mouseX_c = e.pageX;
   photoslider.mouseY_c = e.pageY;
   photoslider.grabImg();
   }
  });

$(window).dblclick(function(e){
if(photoslider.scrollFunc_Exsist == 1 &&e.target.id=="PhotoSlider_NameSpace_Img_Mask_Node"){
    var a = imgSrcPool[photoslider.Index].width;
    var b = imgSrcPool[photoslider.Index].height;
    photoslider.PhotoSizeRecover(a,b,1);
 }           
 });

$(window).mousedown(function(e){
  photoslider.ifmove =0;
  if(photoslider.scrollFunc_Exsist == 1){            
  var x = e.pageX;
  var y = e.pageY;
  photoslider.mouseX = x;
  photoslider.mouseY = y;
  photoslider.RelativeX = x - $("#PhotoSlider_NameSpace_MainImg_Node").offset().left;
  photoslider.RelativeY = y - $("#PhotoSlider_NameSpace_MainImg_Node").offset().top;
  photoslider.mousedown_Lock = 1;
  $("#PhotoSlider_NameSpace_MainImg_Node").css("transition","all 0s");
                
  }         
 }); 


$(window).mouseup(function(){
                if(photoslider.scrollFunc_Exsist ==1){
                 
                $("#PhotoSlider_NameSpace_MainImg_Node").css("transition","all 0.2s");
                photoslider.mousedown_Lock = 0;
                var x = $("#PhotoSlider_NameSpace_MainImg_Node").offset().left;
                var y = $("#PhotoSlider_NameSpace_MainImg_Node").offset().top;
                if(photoslider.testRotateifHorizontal() == 0){
                var iw = $("#PhotoSlider_NameSpace_MainImg_Node").width();
                var ih = $("#PhotoSlider_NameSpace_MainImg_Node").height();
                }else if(photoslider.testRotateifHorizontal() == 1){
                var iw = $("#PhotoSlider_NameSpace_MainImg_Node").height();
                var ih = $("#PhotoSlider_NameSpace_MainImg_Node").width();    
                }
                var ax = $(window).width();
                var ay = $(window).height();
                var x_r =ax-(x+iw);
                var y_b =ay-(y+ih);
     if(photoslider.prenextPool[0]==1 ||photoslider.prenextPool[1]==1){
         //pre next 画框转变为主画框
     
         if(photoslider.prenextPool[0]==1){
             var location = $("#PhotoSlider_NameSpace_preImg_Node").offset().left;
             var locationtop =$("#PhotoSlider_NameSpace_preImg_Node").offset().top;
             //主次画框替换
             $("#PhotoSlider_NameSpace_MainImg_Node").css("transition","0s");
             $("#PhotoSlider_NameSpace_MainImg_Node").css("left",location);
             $("#PhotoSlider_NameSpace_MainImg_Node").css("top",locationtop);
             $("#PhotoSlider_NameSpace_MainImg_Node").width($("#PhotoSlider_NameSpace_preImg_Node").width());
             $("#PhotoSlider_NameSpace_MainImg_Node").height($("#PhotoSlider_NameSpace_preImg_Node").height());


             var d = imgSrcPool.length;
            if(photoslider.Index==0){
               photoslider.Index = d - 1 ; 
            }else{
               photoslider.Index--;  
            }
            photoslider.predoswipe(0);
            if(photoslider.DeviceS ==2){
            $("#PhotoSlider_NameSpace_ToolBarContent_SaverotateIOS_Node").hide();   
            }        
            $("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").hide();
            photoslider.refreshSideImg();
             
             photoslider.prenextPool[0]=0;
         }else if(photoslider.prenextPool[1]==1){
             var location = $("#PhotoSlider_NameSpace_nextImg_Node").offset().left;
             var locationtop =$("#PhotoSlider_NameSpace_nextImg_Node").offset().top;
             
             //主次画框替换
             $("#PhotoSlider_NameSpace_MainImg_Node").css("transition","0s");
             $("#PhotoSlider_NameSpace_MainImg_Node").css("top",locationtop);
             $("#PhotoSlider_NameSpace_MainImg_Node").css("left",location);
             $("#PhotoSlider_NameSpace_MainImg_Node").width($("#PhotoSlider_NameSpace_nextImg_Node").width());
             $("#PhotoSlider_NameSpace_MainImg_Node").height($("#PhotoSlider_NameSpace_nextImg_Node").height());
             var d = imgSrcPool.length;
            if(photoslider.Index == d - 1){
               photoslider.Index = 0 ; 
            }else{
               photoslider.Index++;  
            }
            photoslider.predoswipe(1);
            if(photoslider.DeviceS ==2){
            $("#PhotoSlider_NameSpace_ToolBarContent_SaverotateIOS_Node").hide();   
            }      
            $("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").hide();


            photoslider.refreshSideImg();
             photoslider.prenextPool[1]=0;
         }
         
     }else{     
        if(photoslider.ifmove ==1){
        if(photoslider.testRotateifHorizontal() == 0){
             if(iw >ax && ih >ay){
                if((x > 0 && iw >ax && ih >ay)){
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("left",0);
                }else if(ax-(x+iw)>0 && iw >ax && ih >ay) {
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("left",ax - iw);              
                }
                if(ay-(y+ih) > 0 && ih > ay && iw >ax){
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("top",ay -ih);
                }else if(y > 0 && ih > ay && iw >ax){
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("top",0);
                }
             }else if(iw >ax && ih <=ay){
                 if((x > 0)){
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("left",0);
                }else if(ax-(x+iw)>0) {
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("left",ax - iw);              
                }
                $("#PhotoSlider_NameSpace_MainImg_Node").css("top",ay/2 - ih/2);
             }else if(iw <=ax && ih >ay){
                 if(ay-(y+ih) > 0 ){
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("top",ay -ih);
                }else if(y > 0 ){
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("top",0);
                }
                $("#PhotoSlider_NameSpace_MainImg_Node").css("left",ax/2 - iw/2);
             }else if(iw <=ax && ih <=ay){
                $("#PhotoSlider_NameSpace_MainImg_Node").css("left",ax/2 - iw/2);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("top",ay/2 - ih/2);
             }
               

                
        }else if(photoslider.testRotateifHorizontal() == 1){
                var rotateFixer = (iw-ih)/2;
            if(iw >ax && ih >ay){    
                if((x > 0 && iw >ax && ih >ay)){
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("left",0 +rotateFixer);
                }else if(ax-(x+iw)>0 && iw >ax && ih >ay) {
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("left",ax - iw +rotateFixer);              
                }
                if(ay-(y+ih) > 0 && ih > ay && iw >ax){
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("top",ay -ih -rotateFixer);
                }else if(y > 0 && ih > ay && iw >ax){
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("top",0-rotateFixer);
                }
            }else if(iw >ax && ih <=ay){
                if(x > 0){
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("left",0 +rotateFixer);
                }else if(ax-(x+iw)>0) {
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("left",ax - iw +rotateFixer);              
                }
                $("#PhotoSlider_NameSpace_MainImg_Node").css("top",ay/2 - ih/2 -rotateFixer);
            }else if(iw <=ax && ih >ay){ 
                if(ay-(y+ih) > 0 ){
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("top",ay -ih -rotateFixer);
                }else if(y > 0){
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("top",0-rotateFixer);
                }
                
                $("#PhotoSlider_NameSpace_MainImg_Node").css("left",ax/2 - iw/2 +rotateFixer);
                
            }else if(iw <=ax && ih <=ay){
                $("#PhotoSlider_NameSpace_MainImg_Node").css("left",ax/2 - iw/2 +rotateFixer);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("top",ay/2 - ih/2 -rotateFixer);
            }
        }
        photoslider.ifmove =0;   
       }
      }
     }
  });


photoslider.initModal =function(){
    $(window).scrollLeft(0);
    $(window).scrollTop(0);
    var styleAlready = $("style").length;
    
      photoslider.styleCache = $("style")[0].innerHTML;
      photoslider.styleCache = photoslider.styleCache.replace("overflow-y:scroll;","overflow:hidden;");
      $("style")[0].innerHTML = photoslider.styleCache;
  
    
};

photoslider.open = function(PhotoArray,DeviceS,Index,Role,StaffId,Status,Maindiv) {
     $("#photosliderfixer").height("400px");
   
    
   
    this.PhotoArray = PhotoArray;
    this.DeviceS = DeviceS;
    this.Params = Index;
    photoslider.Index = Index;
    photoslider.IndexPre = 0;
    photoslider.IndexNext = 0;
    photoslider.PhotoArray = PhotoArray;
    photoslider.PhotoArrayL = PhotoArray.length;
    photoslider.DeviceS = DeviceS;
    photoslider.Role = Role;
    photoslider.StaffId = StaffId;
    photoslider.Serial = "";
    photoslider.Status = Status;
    photoslider.InspectionTags = new Array();
    photoslider.prenextPool = [];
    imgSrcPool = new Array(photoslider.PhotoArrayL);
    img = new Array(photoslider.PhotoArrayL);
    photoslider.Maindiv = Maindiv;
    photoslider.scrollcache = $("html").scrollTop();
    if(photoslider.DeviceS == 1){
    photoslider.InspectionTags = conf.InspectionTags;
    photoslider.initModal();

    }
    if(photoslider.DeviceS == 2){
    photoslider.InspectionTags = InspectionTags;    
    }




    for (var i = 0 ; i < photoslider.PhotoArray.length ; i++){
        imgSrcPool[i] = {};
        imgSrcPool[i].src = zjmz.file(photoslider.PhotoArray[i].file);
        imgSrcPool[i].index = i;
        imgSrcPool[i].width = photoslider.getImgSize(imgSrcPool[i].src)[0];
        imgSrcPool[i].height = photoslider.getImgSize(imgSrcPool[i].src)[1];
        
        if(photoslider.PhotoArray[i].tag == null){
            photoslider.PhotoArray[i].tag  = "未分类";
            
        };
        
     }

     photoslider.LoadMImgCache();
     
};

photoslider.LoadMImgCache = function(){
    var a = photoslider.Index;
    img[a] = new Image();
    img[a].src = imgSrcPool[a].src; 
    photoslider.checkMainAlready();
};

photoslider.LoadSImgCache = function(){
    var a = photoslider.Index;
    var a1,a2; 
    if(photoslider.PhotoArrayL == 2 ){
        if(a == 0){
            a2 = 1;
        }else if (a == 1){
            a1 = 0;
        }
    }else if (photoslider.PhotoArrayL >= 3){
        if(a == 0){
        a1 = photoslider.PhotoArrayL - 1 ;
        a2 = a + 1;
 
        }else if (a == photoslider.PhotoArrayL - 1){
            a1 = a - 1;
            a2 = 0;
        }else{
            a1 = a - 1;
            a2 = a + 1;
        }
    }

    if(a1 !=null){
        if(!img[a1]){
        img[a1] = new Image();
        img[a1].src = imgSrcPool[a1].src; 

        photoslider.checkSideImg(a1);
        }


    }else{
 
    }


    if(a2 !=null){
        if(!img[a2]){
        img[a2] = new Image();
        img[a2].src = imgSrcPool[a2].src; 

        photoslider.checkSideImg(a2);
        }
    }else{
      
    }


};

photoslider.checkMainAlready = function(){
         photoslider.openMain();
         photoslider.LoadSImgCache();
};


photoslider.checkSideImg = function(index){
  
        imgSrcPool[index].oheight = imgSrcPool[index].height;
        imgSrcPool[index].owidth = imgSrcPool[index].width;
        imgSrcPool[index].multip = imgSrcPool[index].width / imgSrcPool[index].height;
        photoslider.refreshSideImg();
   



};

photoslider.checkNextImg =function(){
    var count = 0; 
     if(img[photoslider.Index].height == 0 || img[photoslider.Index].width == 0){
        count++;   
     }
     
     if(count == 0){
    //    photoslider.LoadImg();
    //    photoslider.loadSerial();
    //    photoslider.loadCategory();
    //    photoslider.initTheLocation();
        imgSrcPool[photoslider.Index].height = img[photoslider.Index].height;
        imgSrcPool[photoslider.Index].width = img[photoslider.Index].width;
        imgSrcPool[photoslider.Index].oheight = img[photoslider.Index].height;
        imgSrcPool[photoslider.Index].owidth = img[photoslider.Index].width;
        imgSrcPool[photoslider.Index].multip = imgSrcPool[photoslider.Index].width / imgSrcPool[photoslider.Index].height;
        
        return 1;

     }else{
         setTimeout("photoslider.checkNextImg()",100); 
     }
};

photoslider.openMain = function(){
 
    photoslider.scrollFunc_Exsist = 1;
    
    imgSrcPool[photoslider.Index].oheight = imgSrcPool[photoslider.Index].height;
    imgSrcPool[photoslider.Index].owidth = imgSrcPool[photoslider.Index].width;
    imgSrcPool[photoslider.Index].multip = imgSrcPool[photoslider.Index].width / imgSrcPool[photoslider.Index].height;
            
        
    var Background_Node = document.createElement("div");
        Background_Node.setAttribute("id","PhotoSlider_NameSpace_BackGroundNode");
        Background_Node.style.backgroundColor="#000b15";
        Background_Node.style.left="0px";
        Background_Node.style.top="0px";    
        Background_Node.style.width="100%";
        Background_Node.style.height="100%";    
        Background_Node.style.position="absolute";
        Background_Node.style.zIndex="99";
        Background_Node.style.display="none";
        Background_Node.style.transition="all 0.4s"; 
        Background_Node.style.opacity="0";
        Background_Node.style.overflow = "hidden";

    var Img_Mask_Node=document.createElement("div");
        Img_Mask_Node.setAttribute("id","PhotoSlider_NameSpace_Img_Mask_Node"); 
        Img_Mask_Node.style.backgroundColor="red";
        Img_Mask_Node.style.left="0px";
        Img_Mask_Node.style.top="0px";    
        Img_Mask_Node.style.width="100%";
        Img_Mask_Node.style.height="100%";    
        Img_Mask_Node.style.position="absolute";
        Img_Mask_Node.style.zIndex="101";
        Img_Mask_Node.style.display="block";
        Img_Mask_Node.style.opacity="0";
        Img_Mask_Node.style.overflow = "hidden";
        Img_Mask_Node.color="red";
        Img_Mask_Node.setAttribute("onselectstart","return false"); 
        Img_Mask_Node.style.MozUserSelect="none";

    var ToolBar_Node = document.createElement("div");
        ToolBar_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBar_Node");
        ToolBar_Node.style.position="absolute";
        ToolBar_Node.style.zIndex="102";
        ToolBar_Node.style.width="240px";
        ToolBar_Node.style.height="30px";  
        ToolBar_Node.style.right="0px";    
        ToolBar_Node.style.backgroundColor="#000b15";
        ToolBar_Node.style.opacity ="0.7";
        ToolBar_Node.style.display ="block";
    // var Slider_Node = document.createElement("div");
    //     Slider_Node.setAttribute("id","PhotoSlider_NameSpace_Slider_Node");
    //     Slider_Node.style.position="absolute";
    //     Slider_Node.style.zIndex="101";   
    //     Slider_Node.style.width="0px";
    //     Slider_Node.style.height="110px";  
    //     Slider_Node.style.top="30px";   
    //     Slider_Node.style.backgroundColor="blue";
    //     Slider_Node.style.display = "none";

if(photoslider.DeviceS == 1){
   var ToolBarContent_exit_Node = document.createElement("span");
       ToolBarContent_exit_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_exit_Node"); 
       ToolBarContent_exit_Node.style.zIndex="102";
       ToolBarContent_exit_Node.innerHTML = "<p>退出</p>";
       ToolBarContent_exit_Node.style.cursor = "pointer";
       ToolBarContent_exit_Node.style.position="absolute";
       ToolBarContent_exit_Node.style.width="30px";
       ToolBarContent_exit_Node.style.height="30px";  
       ToolBarContent_exit_Node.style.top="0px";
       ToolBarContent_exit_Node.style.lineHeight="30px";
       if(photoslider.DeviceS == 1){
        ToolBarContent_exit_Node.style.right="10px";  
       }else if (photoslider.DeviceS == 2){
        ToolBarContent_exit_Node.style.right="5px";     
       }
       ToolBarContent_exit_Node.style.color = "white";


   var ToolBarContent_delete_Node = document.createElement("span");
       ToolBarContent_delete_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_delete_Node"); 
       ToolBarContent_delete_Node.style.zIndex="102";
       ToolBarContent_delete_Node.innerHTML = "删除";
       ToolBarContent_delete_Node.style.position="absolute";
       ToolBarContent_delete_Node.style.width="30px";
       ToolBarContent_delete_Node.style.height="30px";  
       ToolBarContent_delete_Node.style.top="0px";
       ToolBarContent_delete_Node.style.right="250px";
       ToolBarContent_delete_Node.style.lineHeight="30px";
       ToolBarContent_delete_Node.style.color = "white";   
       ToolBarContent_delete_Node.style.cursor="pointer";

   var ToolBarContent_rotateLeft_Node = document.createElement("span");
       ToolBarContent_rotateLeft_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_rotateLeft_Node"); 
       ToolBarContent_rotateLeft_Node.style.zIndex="102";
       ToolBarContent_rotateLeft_Node.innerHTML = "左旋";
       ToolBarContent_rotateLeft_Node.style.cursor = "pointer";
       ToolBarContent_rotateLeft_Node.style.position="absolute";
       ToolBarContent_rotateLeft_Node.style.width="30px";
       ToolBarContent_rotateLeft_Node.style.height="30px";  
       ToolBarContent_rotateLeft_Node.style.top="0px";
       ToolBarContent_rotateLeft_Node.style.lineHeight="30px";
       ToolBarContent_rotateLeft_Node.style.right="50px";  
       ToolBarContent_rotateLeft_Node.style.color = "white";
    
   var ToolBarContent_rotateRight_Node = document.createElement("span");
       ToolBarContent_rotateRight_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_rotateRight_Node"); 
       ToolBarContent_rotateRight_Node.style.zIndex="102";
       ToolBarContent_rotateRight_Node.innerHTML = "右旋";
       ToolBarContent_rotateRight_Node.style.cursor = "pointer";
       ToolBarContent_rotateRight_Node.style.position="absolute";
       ToolBarContent_rotateRight_Node.style.width="30px";
       ToolBarContent_rotateRight_Node.style.height="30px";  
       ToolBarContent_rotateRight_Node.style.top="0px";
       ToolBarContent_rotateRight_Node.style.lineHeight="30px";
       ToolBarContent_rotateRight_Node.style.right="90px";  
       ToolBarContent_rotateRight_Node.style.color = "white";
  

   var ToolBarContent_ZoomOut_Node = document.createElement("span");
       ToolBarContent_ZoomOut_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_ZoomOut_Node"); 
       ToolBarContent_ZoomOut_Node.style.zIndex="102";
       ToolBarContent_ZoomOut_Node.innerHTML = "缩小";
       ToolBarContent_ZoomOut_Node.style.cursor = "pointer";
       ToolBarContent_ZoomOut_Node.style.position="absolute";
       ToolBarContent_ZoomOut_Node.style.width="30px";
       ToolBarContent_ZoomOut_Node.style.height="30px";  
       ToolBarContent_ZoomOut_Node.style.top="0px";
       ToolBarContent_ZoomOut_Node.style.lineHeight="30px";
       ToolBarContent_ZoomOut_Node.style.right="130px";  
       ToolBarContent_ZoomOut_Node.style.color = "white";
  
    
   var ToolBarContent_ZoomIn_Node = document.createElement("span");
       ToolBarContent_ZoomIn_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_ZoomIn_Node"); 
       ToolBarContent_ZoomIn_Node.style.zIndex="102";
       ToolBarContent_ZoomIn_Node.innerHTML = "放大";
       ToolBarContent_ZoomIn_Node.style.cursor = "pointer";
       ToolBarContent_ZoomIn_Node.style.position="absolute";
       ToolBarContent_ZoomIn_Node.style.width="30px";
       ToolBarContent_ZoomIn_Node.style.height="30px";  
       ToolBarContent_ZoomIn_Node.style.top="0px";
       ToolBarContent_ZoomIn_Node.style.lineHeight="30px";
       ToolBarContent_ZoomIn_Node.style.right="170px";  
       ToolBarContent_ZoomIn_Node.style.color = "white";
      

   var ToolBarContent_Recover_Node = document.createElement("span");
       ToolBarContent_Recover_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_Recover_Node"); 
       ToolBarContent_Recover_Node.style.zIndex="102";
       ToolBarContent_Recover_Node.innerHTML = "还原";
       ToolBarContent_Recover_Node.style.cursor = "pointer";
       ToolBarContent_Recover_Node.style.position="absolute";
       ToolBarContent_Recover_Node.style.width="30px";
       ToolBarContent_Recover_Node.style.height="30px";  
       ToolBarContent_Recover_Node.style.top="0px";
       ToolBarContent_Recover_Node.style.lineHeight="30px";
       ToolBarContent_Recover_Node.style.right="210px";  
       ToolBarContent_Recover_Node.style.color = "white";

 var ToolBarContent_index_Node = document.createElement("span");
       ToolBarContent_index_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_index_Node"); 
       ToolBarContent_index_Node.style.zIndex="102";
       ToolBarContent_index_Node.innerHTML = "";
       ToolBarContent_index_Node.style.position="absolute";
       ToolBarContent_index_Node.style.width="60px";
       ToolBarContent_index_Node.style.height="30px";  
       ToolBarContent_index_Node.style.top="0px";
       ToolBarContent_index_Node.style.lineHeight="30px";
       ToolBarContent_index_Node.style.left="10px"; 
       ToolBarContent_index_Node.style.textAlign = "center";
      
       ToolBarContent_index_Node.style.color = "white";


   var ToolBarContent_category_Select_Node = document.createElement("div");
       ToolBarContent_category_Select_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_category_Select_Node"); 
       ToolBarContent_category_Select_Node.style.zIndex="102";
       ToolBarContent_category_Select_Node.style.position="absolute";
       ToolBarContent_category_Select_Node.style.width="230px";
       ToolBarContent_category_Select_Node.style.height="150px";  
       ToolBarContent_category_Select_Node.style.top="30px";
       ToolBarContent_category_Select_Node.style.backgroundColor = "#073a66";
       ToolBarContent_category_Select_Node.style.borderRadius ="10px";
       ToolBarContent_category_Select_Node.style.display ="none";



   var ToolBarContent_category_Select_Tags_Node = document.createElement("div"); 
       ToolBarContent_category_Select_Tags_Node.setAttribute("class","PhotoSlider_NameSpace_ToolBarContent_category_Select_Tags_Node"); 
       ToolBarContent_category_Select_Tags_Node.innerHTML = "123";
       ToolBarContent_category_Select_Tags_Node.style.zIndex="103";
       ToolBarContent_category_Select_Tags_Node.style.width="64px";
       ToolBarContent_category_Select_Tags_Node.style.position="relative";
       ToolBarContent_category_Select_Tags_Node.style.marginLeft ="10px";
       ToolBarContent_category_Select_Tags_Node.style.float = "left";
       ToolBarContent_category_Select_Tags_Node.style.height="30px";
       ToolBarContent_category_Select_Tags_Node.style.lineHeight = "30px";
       ToolBarContent_category_Select_Tags_Node.style.color="white";
       ToolBarContent_category_Select_Tags_Node.style.cursor="pointer";
       if(photoslider.DeviceS ==2){
           ToolBarContent_category_Select_Tags_Node.style.fontSize = "15px";
       }
    var ToolBarContent_SaverotatePC_Node = document.createElement("span");
       ToolBarContent_SaverotatePC_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_SaverotatePC_Node"); 
       ToolBarContent_SaverotatePC_Node.style.zIndex="102";
       ToolBarContent_SaverotatePC_Node.innerHTML = "<p>保存旋转</p>";
       ToolBarContent_SaverotatePC_Node.style.position="absolute";
       ToolBarContent_SaverotatePC_Node.style.width="60px";
       ToolBarContent_SaverotatePC_Node.style.height="30px";       
       ToolBarContent_SaverotatePC_Node.style.lineHeight="30px";
       ToolBarContent_SaverotatePC_Node.style.right ="290px";  
       ToolBarContent_SaverotatePC_Node.style.color = "white";    
       ToolBarContent_SaverotatePC_Node.style.display = "none";
       ToolBarContent_SaverotatePC_Node.style.cursor = "pointer";
       

}else if(photoslider.DeviceS == 2){
    var ToolBarBottom_Node = document.createElement("div");
        ToolBarBottom_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarBottom_Node");
        ToolBarBottom_Node.style.position="absolute";
        ToolBarBottom_Node.style.zIndex="101";
        ToolBarBottom_Node.style.width="100%";
        ToolBarBottom_Node.style.height="30px";  
        ToolBarBottom_Node.style.bottom="0px";    
        ToolBarBottom_Node.style.backgroundColor="#000b15";
        ToolBarBottom_Node.style.opacity ="0.7";

    var ToolBarContent_rotateIOS_Node = document.createElement("span");
       ToolBarContent_rotateIOS_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_rotateIOS_Node"); 
       ToolBarContent_rotateIOS_Node.style.zIndex="102";
       ToolBarContent_rotateIOS_Node.innerHTML = "<p>旋转</p>";
       ToolBarContent_rotateIOS_Node.style.cursor = "pointer";
       ToolBarContent_rotateIOS_Node.style.position="absolute";
       ToolBarContent_rotateIOS_Node.style.width="30px";
       ToolBarContent_rotateIOS_Node.style.height="30px";  
       ToolBarContent_rotateIOS_Node.style.lineHeight="30px";
       ToolBarContent_rotateIOS_Node.style.left ="5px";  
       ToolBarContent_rotateIOS_Node.style.color = "white";

   var ToolBarContent_SaverotateIOS_Node = document.createElement("span");
       ToolBarContent_SaverotateIOS_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_SaverotateIOS_Node"); 
       ToolBarContent_SaverotateIOS_Node.style.zIndex="102";
       ToolBarContent_SaverotateIOS_Node.innerHTML = "<p>保存旋转</p>";
       ToolBarContent_SaverotateIOS_Node.style.position="absolute";
       ToolBarContent_SaverotateIOS_Node.style.width="60px";
       ToolBarContent_SaverotateIOS_Node.style.height="30px";       
       ToolBarContent_SaverotateIOS_Node.style.lineHeight="30px";
       ToolBarContent_SaverotateIOS_Node.style.left ="55px";  
       ToolBarContent_SaverotateIOS_Node.style.color = "white";    
       ToolBarContent_SaverotateIOS_Node.style.display = "none";


   var ToolBarContent_index_Node = document.createElement("span");
       ToolBarContent_index_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_index_Node"); 
       ToolBarContent_index_Node.style.zIndex="102";
       ToolBarContent_index_Node.innerHTML = "";
       ToolBarContent_index_Node.style.position="absolute";
       ToolBarContent_index_Node.style.width="80px";
       ToolBarContent_index_Node.style.height="30px";  
       ToolBarContent_index_Node.style.top="0px";
       ToolBarContent_index_Node.style.lineHeight="30px";
       ToolBarContent_index_Node.style.left="5px"; 
       ToolBarContent_index_Node.style.textAlign = "left";
       ToolBarContent_index_Node.style.float="left";
       ToolBarContent_index_Node.style.color = "white";

   var ToolBarContent_deleteIOS_Node = document.createElement("span");
       ToolBarContent_deleteIOS_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_deleteIOS_Node"); 
       ToolBarContent_deleteIOS_Node.style.zIndex="102";
       ToolBarContent_deleteIOS_Node.innerHTML = "<p>删除</p>";
       ToolBarContent_deleteIOS_Node.style.position="absolute";
       ToolBarContent_deleteIOS_Node.style.width="50px";
       ToolBarContent_deleteIOS_Node.style.height="30px";  
       ToolBarContent_deleteIOS_Node.style.top="0px";
       ToolBarContent_deleteIOS_Node.style.right="5px";
       ToolBarContent_deleteIOS_Node.style.lineHeight="30px";
       ToolBarContent_deleteIOS_Node.style.color = "white";
       ToolBarContent_deleteIOS_Node.style.textAlign = "right";

  var ToolBarContent_category_Select_Node = document.createElement("div");
       ToolBarContent_category_Select_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_category_Select_Node"); 
       ToolBarContent_category_Select_Node.style.zIndex="102";
       ToolBarContent_category_Select_Node.style.position="absolute";
       ToolBarContent_category_Select_Node.style.width="90px";
       ToolBarContent_category_Select_Node.style.height="420px";  
       ToolBarContent_category_Select_Node.style.bottom="30px";
       ToolBarContent_category_Select_Node.style.right="0px";
       ToolBarContent_category_Select_Node.style.backgroundColor = "#f6f6f6";
       ToolBarContent_category_Select_Node.style.borderRadius ="10px";
       ToolBarContent_category_Select_Node.style.display ="none";




   var ToolBarContent_category_Select_Tags_Node = document.createElement("div"); 
       ToolBarContent_category_Select_Tags_Node.setAttribute("class","PhotoSlider_NameSpace_ToolBarContent_category_Select_Tags_Node"); 
       ToolBarContent_category_Select_Tags_Node.innerHTML = "123";
       ToolBarContent_category_Select_Tags_Node.style.zIndex="103";
       ToolBarContent_category_Select_Tags_Node.style.width="64px";
       ToolBarContent_category_Select_Tags_Node.style.position="relative";
       ToolBarContent_category_Select_Tags_Node.style.marginLeft ="10px";
       ToolBarContent_category_Select_Tags_Node.style.float = "left";
       ToolBarContent_category_Select_Tags_Node.style.height="30px";
       ToolBarContent_category_Select_Tags_Node.style.lineHeight = "30px";
       ToolBarContent_category_Select_Tags_Node.style.color="white";
       ToolBarContent_category_Select_Tags_Node.style.cursor="pointer";
       ToolBarContent_category_Select_Tags_Node.style.fontSize = "15px";
       ToolBarContent_category_Select_Tags_Node.style.color="black";
       


     var ios_test_Node = document.createElement("div"); 
       ios_test_Node.setAttribute("id","PhotoSlider_NameSpace_ios_test_Node"); 
       ios_test_Node.innerHTML = "";
       ios_test_Node.style.zIndex="120";
       ios_test_Node.style.width="100px";
       ios_test_Node.style.position="absolute";
       ios_test_Node.style.height="100px";
       ios_test_Node.style.color="yellow";
       ios_test_Node.style.top="30px";
       ios_test_Node.style.left="0px";
       ios_test_Node.style.marginBottom ="0px";
}  
   var nextImg_Node = document.createElement("div");
       nextImg_Node.setAttribute("id","PhotoSlider_NameSpace_nextImg_Node"); 
       nextImg_Node.style.zIndex="100";
       nextImg_Node.innerHTML = "";
       nextImg_Node.style.backgroundImage = "";
       nextImg_Node.style.backgroundSize = "cover";

    // nextImg_Node.style.cursor = "pointer";
       nextImg_Node.style.position="absolute";



   var preImg_Node = document.createElement("div");
       preImg_Node.setAttribute("id","PhotoSlider_NameSpace_preImg_Node"); 
       preImg_Node.style.zIndex="100";
       preImg_Node.innerHTML = "";
       preImg_Node.style.backgroundImage = "";
       preImg_Node.style.backgroundSize = "cover";

    // preImg_Node.style.cursor = "pointer";
       preImg_Node.style.position="absolute";

    // preImg_Node.style.backgroundColor="yellow";
    //    preImg_Node.style.transition = "all 0.2s";

   var ToolBarContent_category_Node = document.createElement("span");
       ToolBarContent_category_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_category_Node"); 
       ToolBarContent_category_Node.style.zIndex="102";
       ToolBarContent_category_Node.innerHTML = "";
       ToolBarContent_category_Node.style.position="absolute";
       ToolBarContent_category_Node.style.width="70px";
       ToolBarContent_category_Node.style.height="30px";  
       ToolBarContent_category_Node.style.top="0px";
       ToolBarContent_category_Node.style.lineHeight="30px";
       if(photoslider.DeviceS ==1){
           ToolBarContent_category_Node.style.right="370px"; 
           ToolBarContent_category_Node.style.textAlign = "center";
       }else if(photoslider.DeviceS ==2){
           ToolBarContent_category_Node.style.right="5px"; 
           ToolBarContent_category_Node.style.textAlign = "right";
       }
        
       ToolBarContent_category_Node.style.color = "white";
       

   



   
       

   var ToolBarContent_Date_Node = document.createElement("span");
       ToolBarContent_Date_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_Date_Node"); 
       ToolBarContent_Date_Node.style.zIndex="102";
       ToolBarContent_Date_Node.innerHTML = "<p><span id='PhotoSlider_NameSpace_ToolBarContent_Date_set_Node' style='cursor:pointer;'>设置排序编号</span></p>";
       ToolBarContent_Date_Node.style.position="absolute";
       ToolBarContent_Date_Node.style.width="170px";
       ToolBarContent_Date_Node.style.height="30px";  
       if(photoslider.DeviceS == 1){
         ToolBarContent_Date_Node.style.top="0px";
         ToolBarContent_Date_Node.style.left="80px"; 
         ToolBarContent_Date_Node.style.textAlign = "right";
       }else if(photoslider.DeviceS == 2){
         ToolBarContent_Date_Node.style.bottom="0px";  
         ToolBarContent_Date_Node.style.left="5px"; 
         ToolBarContent_Date_Node.style.textAlign ="left";
       }
       ToolBarContent_Date_Node.style.lineHeight="30px";
       ToolBarContent_Date_Node.style.color = "white";
       


  var ToolBarContent_DateC_Node = document.createElement("span");
       ToolBarContent_DateC_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_DateC_Node"); 
       ToolBarContent_DateC_Node.style.zIndex="102";
       ToolBarContent_DateC_Node.innerHTML = "<span class='glyphicon glyphicon-tags'></span>";
       ToolBarContent_DateC_Node.style.position="absolute";
       ToolBarContent_DateC_Node.style.width="30px";
       ToolBarContent_DateC_Node.style.height="30px";  
       ToolBarContent_DateC_Node.style.top="0px";
       ToolBarContent_DateC_Node.style.lineHeight="30px";
       ToolBarContent_DateC_Node.style.left="260px";  
       ToolBarContent_DateC_Node.style.color = "white";
       ToolBarContent_DateC_Node.style.textAlign = "left";     
       ToolBarContent_DateC_Node.style.cursor = "pointer";
       
   
   var ToolBarContent_DateC_Year_Node = document.createElement("span");
       ToolBarContent_DateC_Year_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_DateC_Year_Node"); 
       ToolBarContent_DateC_Year_Node.style.zIndex="103";
       ToolBarContent_DateC_Year_Node.innerHTML = "<span style='float:left;height:30px;'><input type='text' style='width:40px;height:30px;color:#000b15;padding:0px;' maxlength='4' id='ToolBarContent_DateC_Year_Form' /> 年&nbsp</span>" +
                                                  "<span style='float:left;height:30px;'><input type='text' style='width:30px;height:30px;color:#000b15;padding:0px;' maxlength='2' id='ToolBarContent_DateC_Month_Form' /> 月&nbsp</span>" +                                                  
                                                  "<span style='float:left;height:30px;'> 第 <input type='text' style='width:30px;height:30px;color:#000b15;padding:0px;' maxlength='2' id='ToolBarContent_DateC_Index_Form' /> 张 </span>";
       ToolBarContent_DateC_Year_Node.style.position="absolute";
       ToolBarContent_DateC_Year_Node.style.width="210px";
       ToolBarContent_DateC_Year_Node.style.height="30px";  
       ToolBarContent_DateC_Year_Node.style.top="0px";
       ToolBarContent_DateC_Year_Node.style.lineHeight="30px";
       ToolBarContent_DateC_Year_Node.style.left="0px";  
       ToolBarContent_DateC_Year_Node.style.color = "white";
  
       ToolBarContent_DateC_Year_Node.style.textAlign = "left";     
       



   var ToolBarContent_DateModal_Node = document.createElement("div");
       ToolBarContent_DateModal_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_DateModal_Node"); 
       ToolBarContent_DateModal_Node.innerHTML = ""
       ToolBarContent_DateModal_Node.style.zIndex="102";
         
       if(photoslider.DeviceS ==1){
           ToolBarContent_DateModal_Node.style.left="125px";
           ToolBarContent_DateModal_Node.style.top="30px";
       }else if(photoslider.DeviceS ==2){
           ToolBarContent_DateModal_Node.style.left="0px";
           ToolBarContent_DateModal_Node.style.bottom="30px";
       }
       
       ToolBarContent_DateModal_Node.style.width ="300px";
       ToolBarContent_DateModal_Node.style.height ="30px";
       ToolBarContent_DateModal_Node.style.position="absolute";
       ToolBarContent_DateModal_Node.style.backgroundColor="#073a66";
       ToolBarContent_DateModal_Node.style.display = "none";

   var ToolBarContent_DateModal_Save_Node = document.createElement("span");
       ToolBarContent_DateModal_Save_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_DateModal_Save_Node"); 
       ToolBarContent_DateModal_Save_Node.innerHTML = "<span id='ToolBarContent_DateModal_Save_save_Node' style='cursor:pointer;'>保存</span><span style='cursor:pointer;margin-left:10px;'id='ToolBarContent_DateModal_Save_cancel_Node'>取消</span>"
       ToolBarContent_DateModal_Save_Node.style.zIndex="103";
       ToolBarContent_DateModal_Save_Node.style.right="5px";  
       ToolBarContent_DateModal_Save_Node.style.lineHeight = "30px";
       ToolBarContent_DateModal_Save_Node.style.width ="70px";
       ToolBarContent_DateModal_Save_Node.style.height ="30px";
       ToolBarContent_DateModal_Save_Node.style.position="absolute";
       ToolBarContent_DateModal_Save_Node.style.color="white";


   var ToolBarContent_OpenCloseSlider_Node = document.createElement("span");
       ToolBarContent_OpenCloseSlider_Node.setAttribute("id","PhotoSlider_NameSpace_ToolBarContent_OpenCloseSlider_Node"); 
       ToolBarContent_OpenCloseSlider_Node.style.zIndex="102";
       ToolBarContent_OpenCloseSlider_Node.innerHTML = "开关缩略图";
       ToolBarContent_OpenCloseSlider_Node.style.cursor = "pointer";
       ToolBarContent_OpenCloseSlider_Node.style.position="absolute";
       ToolBarContent_OpenCloseSlider_Node.style.width="100px";
       ToolBarContent_OpenCloseSlider_Node.style.height="30px";  
       ToolBarContent_OpenCloseSlider_Node.style.top="0px";
       ToolBarContent_OpenCloseSlider_Node.style.lineHeight="30px";
       ToolBarContent_OpenCloseSlider_Node.style.left="230px";  
       ToolBarContent_OpenCloseSlider_Node.style.backgroundColor="yellow";
       ToolBarContent_OpenCloseSlider_Node.style.textAlign = "center";
      



   var Swipe_toLeft_Node = document.createElement("span");
       Swipe_toLeft_Node.setAttribute("id","PhotoSlider_NameSpace_Swipe_toLeft_Node"); 
       Swipe_toLeft_Node.setAttribute("class","ion-arrow-left-b"); 
       Swipe_toLeft_Node.style.zIndex="110";
       Swipe_toLeft_Node.innerHTML = "";
       Swipe_toLeft_Node.style.fontSize = "40px";
       Swipe_toLeft_Node.style.cursor = "pointer";
       Swipe_toLeft_Node.style.position="absolute";
       Swipe_toLeft_Node.style.width="40px";
       Swipe_toLeft_Node.style.height="40px";  
       Swipe_toLeft_Node.style.top="0px";
       Swipe_toLeft_Node.style.lineHeight="40px";
       Swipe_toLeft_Node.style.left="0px";  
       Swipe_toLeft_Node.style.color = "white";
       Swipe_toLeft_Node.style.textAlign = "center";
    
   var Swipe_toRight_Node = document.createElement("span");
       Swipe_toRight_Node.setAttribute("id","PhotoSlider_NameSpace_Swipe_toRight_Node"); 
       Swipe_toRight_Node.setAttribute("class","ion-arrow-right-b"); 
       Swipe_toRight_Node.style.zIndex="110";
       Swipe_toRight_Node.innerHTML = "";
       Swipe_toRight_Node.style.fontSize = "40px";
       Swipe_toRight_Node.style.cursor = "pointer";
       Swipe_toRight_Node.style.position="absolute";
       Swipe_toRight_Node.style.width="40px";
       Swipe_toRight_Node.style.height="40px";  
       Swipe_toRight_Node.style.top="0px";
       Swipe_toRight_Node.style.lineHeight="40px";
       Swipe_toRight_Node.style.right="0px";  
       Swipe_toRight_Node.style.color = "white";
       Swipe_toRight_Node.style.textAlign = "center";
      
   var HideToolBar_Node = document.createElement("div");
       HideToolBar_Node.setAttribute("id","PhotoSlider_NameSpace_HideToolBar_Node"); 
       HideToolBar_Node.style.zIndex="108";
       HideToolBar_Node.innerHTML = "隐藏工具条";
       HideToolBar_Node.style.backgroundColor = "#073a66";
       HideToolBar_Node.style.position="absolute";
       HideToolBar_Node.style.width="20px";
       HideToolBar_Node.style.height="100px";  
       HideToolBar_Node.style.top="30px";
       HideToolBar_Node.style.left="0px";  
       HideToolBar_Node.style.cursor ="pointer";
       HideToolBar_Node.style.color="white";

   var MainImg_Node = document.createElement("div");
       MainImg_Node.setAttribute("id","PhotoSlider_NameSpace_MainImg_Node"); 
       MainImg_Node.style.zIndex="100";
       MainImg_Node.innerHTML = "<br/>";
       MainImg_Node.style.backgroundImage = "";
       MainImg_Node.style.backgroundSize = "cover";
    // MainImg_Node.style.cursor = "pointer";
       MainImg_Node.style.position="absolute";
       MainImg_Node.style.width="0px";
       MainImg_Node.style.height="0px";  
       MainImg_Node.style.top="0px";
       MainImg_Node.style.left="0px";  
    // MainImg_Node.style.backgroundColor="yellow";
       MainImg_Node.style.transition = "all 0.2s";




   //绑定节点  
   document.body.appendChild(Background_Node);     
   
   
//    Background_Node.appendChild(Slider_Node);
   Background_Node.appendChild(MainImg_Node);
//    Background_Node.appendChild(TestInfo_Node);
   Background_Node.appendChild(Swipe_toLeft_Node);  
   Background_Node.appendChild(Swipe_toRight_Node);  

   
   
    
   
   
   if(photoslider.DeviceS ==1){
   Background_Node.appendChild(Img_Mask_Node);  
   Background_Node.appendChild(ToolBar_Node);   
   Background_Node.appendChild(HideToolBar_Node);  
//    document.body.appendChild();    
   ToolBar_Node.appendChild(ToolBarContent_rotateLeft_Node);
   ToolBar_Node.appendChild(ToolBarContent_rotateRight_Node);
   ToolBar_Node.appendChild(ToolBarContent_delete_Node);
   ToolBar_Node.appendChild(ToolBarContent_ZoomOut_Node);
   ToolBar_Node.appendChild(ToolBarContent_ZoomIn_Node);
   ToolBar_Node.appendChild(ToolBarContent_Recover_Node);
   ToolBar_Node.appendChild(ToolBarContent_Date_Node);
   ToolBar_Node.appendChild(ToolBarContent_DateC_Node);
   ToolBar_Node.appendChild(ToolBarContent_DateModal_Node);
   ToolBar_Node.appendChild(ToolBarContent_exit_Node);
   ToolBar_Node.appendChild(ToolBarContent_category_Select_Node);
   ToolBar_Node.appendChild(ToolBarContent_category_Node);     
   ToolBar_Node.appendChild(ToolBarContent_SaverotatePC_Node);
   Background_Node.appendChild(nextImg_Node);
   Background_Node.appendChild(preImg_Node);
   }else if(photoslider.DeviceS ==2){
   Background_Node.appendChild(ToolBar_Node);  
   Background_Node.appendChild(ToolBarBottom_Node); 
   Background_Node.appendChild(ios_test_Node);
   Background_Node.appendChild(nextImg_Node);
   Background_Node.appendChild(preImg_Node);
   ToolBar_Node.appendChild(ToolBarContent_deleteIOS_Node);
   //ToolBarBottom_Node.appendChild(ToolBarContent_Date_Node);
   //ToolBarBottom_Node.appendChild(ToolBarContent_DateC_Node);
   ToolBarBottom_Node.appendChild(ToolBarContent_rotateIOS_Node);
   Background_Node.appendChild(ToolBarContent_category_Select_Node);
   // ToolBarBottom_Node.appendChild(ToolBarContent_DateModal_Node);
   ToolBarBottom_Node.appendChild(ToolBarContent_category_Node);
   ToolBarBottom_Node.appendChild(ToolBarContent_SaverotateIOS_Node);
   }
   
   ToolBarContent_category_Select_Node.appendChild(ToolBarContent_category_Select_Tags_Node);

   var divModel = $(".PhotoSlider_NameSpace_ToolBarContent_category_Select_Tags_Node");
   for(var i =0 ; i < photoslider.InspectionTags.length; i++){
       if(i != 0){
           $("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").append(divModel.clone());
       }
           $(".PhotoSlider_NameSpace_ToolBarContent_category_Select_Tags_Node")[i].innerHTML = photoslider.InspectionTags[i].tag;
      
   }



   

   ToolBar_Node.appendChild(ToolBarContent_index_Node);
   
   
   
   
   ToolBarContent_DateModal_Node.appendChild(ToolBarContent_DateModal_Save_Node);
   ToolBarContent_DateModal_Node.appendChild(ToolBarContent_DateC_Year_Node);


  




   photoslider.initRotatePool();

   photoslider.bindButton();
   photoslider.LoadImg();
   photoslider.loadSerial();
   photoslider.loadCategory();
   photoslider.initTheLocation();
   photoslider.checksideIndex();
   photoslider.checkDelButton();
  




    if(photoslider.Role =="user" || photoslider.Status!="new"){
       $("#PhotoSlider_NameSpace_ToolBarContent_Date_set_Node").css("cursor","default");
       $("#PhotoSlider_NameSpace_ToolBarContent_DateC_Node").css("cursor","default");
       
    }




//    if(photoslider.scrollFunc_Exsist == 1){
//        setInterval("photoslider.TestInfoUpdate();",10);
//    }
};



   $(window).resize(function(){  
    if(photoslider.scrollFunc_Exsist == 1){
        photoslider.initTheLocation();
    }
   });


   photoslider.mousedown_Lock = 0;
   photoslider.mouseX = 0;
   photoslider.mouseY = 0;
   photoslider.mouseX_c = 0;
   photoslider.mouseY_c = 0;
   photoslider.RelativeX = 0;
   photoslider.RelativeY = 0;
   
   photoslider.initTheLocation=function(ifA){
       if(ifA!=1){
       $("#PhotoSlider_NameSpace_BackGroundNode").css("transition","all 0s");
       $("#PhotoSlider_NameSpace_MainImg_Node").css("transition","all 0s");
       }
       var WinHeight = $(window).height();
       var WinWidth = $(window).width();
       //   if(photoslider.testRotateifHorizontal()==0){
       var ImgWidth = imgSrcPool[photoslider.Index].width;
       var ImgHeight = imgSrcPool[photoslider.Index].height;
        
       
       var cate_select_width = $("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").width();
       var mutip = imgSrcPool[photoslider.Index].multip;
       //重设背景大小
       
       $("#PhotoSlider_NameSpace_BackGroundNode").height(WinHeight);
       $("#PhotoSlider_NameSpace_BackGroundNode").width(WinWidth);
       
       //设置蒙版
       $("#PhotoSlider_NameSpace_Img_Mask_Node").height(WinHeight);
       $("#PhotoSlider_NameSpace_Img_Mask_Node").width(WinWidth);

       //重设向左向右按钮位置
       $("#PhotoSlider_NameSpace_Swipe_toLeft_Node").css("top",WinHeight/2 - 20 );
       $("#PhotoSlider_NameSpace_Swipe_toRight_Node").css("top",WinHeight/2 - 20 );
       //重设工具栏宽度
       $("#PhotoSlider_NameSpace_ToolBar_Node").width(WinWidth);
       //重设类别选择框位置
       if(photoslider.DeviceS ==1){
       $("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").css("left",WinWidth/2 - cate_select_width/2 );
       $("#PhotoSlider_NameSpace_BackGroundNode").css("transition","all 0.4s");
       $("#PhotoSlider_NameSpace_MainImg_Node").css("transition","all 0.2s");
       
       //重设IMG大小和位置

       if(ImgWidth >= WinWidth || ImgHeight >= WinHeight){
           if(ImgWidth >= WinWidth &&ImgHeight <WinHeight){
                $("#PhotoSlider_NameSpace_MainImg_Node").css("width",WinWidth);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("height",WinWidth / mutip);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("left",0 );
                $("#PhotoSlider_NameSpace_MainImg_Node").css("top",WinHeight/2 - (WinWidth / mutip)/2 );
                
           }else if(ImgWidth < WinWidth && ImgHeight >=WinHeight){
                $("#PhotoSlider_NameSpace_MainImg_Node").css("height",WinHeight);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("width",WinHeight * mutip);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("top",0);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("left",WinWidth/2 - (WinHeight * mutip)/2 );
           }else{
               //长和宽都大于屏幕
               if(WinWidth / mutip >=WinHeight){
                   $("#PhotoSlider_NameSpace_MainImg_Node").css("height",WinHeight);
                   $("#PhotoSlider_NameSpace_MainImg_Node").css("width",WinHeight * mutip);
                   $("#PhotoSlider_NameSpace_MainImg_Node").css("top",0);
                   $("#PhotoSlider_NameSpace_MainImg_Node").css("left",WinWidth/2 - (WinHeight * mutip)/2 );
               }else{
                   $("#PhotoSlider_NameSpace_MainImg_Node").css("width",WinWidth);
                   $("#PhotoSlider_NameSpace_MainImg_Node").css("height",WinWidth / mutip);
                   $("#PhotoSlider_NameSpace_MainImg_Node").css("left",0 );
                   $("#PhotoSlider_NameSpace_MainImg_Node").css("top",WinHeight/2 - (WinWidth / mutip)/2 );
               }


           }

  
       }else{


       
            $("#PhotoSlider_NameSpace_MainImg_Node").css("width",ImgWidth);
            $("#PhotoSlider_NameSpace_MainImg_Node").css("height",ImgHeight);
            $("#PhotoSlider_NameSpace_MainImg_Node").css("left",WinWidth/2 - ImgWidth/2 );
            $("#PhotoSlider_NameSpace_MainImg_Node").css("top",WinHeight/2 - ImgHeight/2 );
         
       }  

        //设置前后container的位置和大小
        $("#PhotoSlider_NameSpace_nextImg_Node").css("transition","0s");
        $("#PhotoSlider_NameSpace_preImg_Node").css("transition","0s");
        
        



       }else if(photoslider.DeviceS ==2){
          if(photoslider.testRotateifHorizontal()==0){
          
           if(ImgWidth >= WinWidth && ImgHeight >=WinHeight ){
               $("#PhotoSlider_NameSpace_MainImg_Node").css("width",WinWidth);
               $("#PhotoSlider_NameSpace_MainImg_Node").css("height",WinWidth / mutip);
               ImgWidth = WinWidth ;
               ImgHeight = WinWidth / mutip;
            }else{
                if(ImgWidth >= ImgHeight){
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("width",WinWidth);
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("height",WinWidth / mutip);
                    ImgWidth = WinWidth;
                    ImgHeight = WinWidth / mutip;
                }else{
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("height",WinHeight);
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("width",WinHeight * mutip);
                    ImgWidth = WinHeight * mutip;
                    ImgHeight = WinHeight;
                }
            }
                $("#PhotoSlider_NameSpace_MainImg_Node").css("left",WinWidth/2 - ImgWidth/2 );
                $("#PhotoSlider_NameSpace_MainImg_Node").css("top",WinHeight/2 - ImgHeight/2 );
                
                $("#PhotoSlider_NameSpace_nextImg_Node").height($(window).height()-120);
                $("#PhotoSlider_NameSpace_nextImg_Node").width($(window).width()-60);
                $("#PhotoSlider_NameSpace_preImg_Node").height($(window).height()-120);
                $("#PhotoSlider_NameSpace_preImg_Node").width($(window).width()-60);
                $("#PhotoSlider_NameSpace_nextImg_Node").css("top",$(window).height()/2 - $("#PhotoSlider_NameSpace_nextImg_Node").height()/2);
                $("#PhotoSlider_NameSpace_preImg_Node").css("top",$(window).height()/2 - $("#PhotoSlider_NameSpace_preImg_Node").height()/2);
                $("#PhotoSlider_NameSpace_nextImg_Node").css("left",$(window).width());
                $("#PhotoSlider_NameSpace_preImg_Node").css("left",-$("#PhotoSlider_NameSpace_preImg_Node").width());
  
        } 
        
        


          }
   };

   photoslider.predoswipe = function(leftright){
       
            photoslider.checksideIndex();
            var i = leftright;
            var a = imgSrcPool[photoslider.Index].width;
            var b = imgSrcPool[photoslider.Index].height;
            $('#PhotoSlider_NameSpace_ToolBarContent_DateModal_Node').hide();
            photoslider.loadCategory();
            if(i == 0){
                photoslider.phototoLeft(photoslider.Index); 
            }else if (i == 1){
                photoslider.phototoRight(photoslider.Index); 
            }
            photoslider.LoadSImgCache();
            photoslider.PhotoSizeRecover(a,b,1);
            //photoslider.initTheLocation(1);
       
            photoslider.checkDelButton();
            photoslider.checkRotateSaveButton();
   };


   photoslider.bindButton = function(){
        
        

        if(photoslider.DeviceS ==1){
            $('#PhotoSlider_NameSpace_ToolBarContent_exit_Node').click(function(){
                $("#PhotoSlider_NameSpace_BackGroundNode").remove();
                // $("#PhotoSlider_NameSpace_Img_Mask_Node").remove();
                photoslider.scrollFunc_Exsist = 0;
               
                $("html").scrollTop(photoslider.scrollcache);
                refreshReservation();
                photoslider.styleCache = photoslider.styleCache.replace("overflow:hidden;","overflow-y:scroll;");
                $("style")[0].innerHTML = photoslider.styleCache;
                $("#photosliderfixer").height("100%");
            });
            $("#PhotoSlider_NameSpace_ToolBarContent_ZoomIn_Node").click(function(){
                PhotosliderZoomIn(0);
            });
            $("#PhotoSlider_NameSpace_ToolBarContent_ZoomOut_Node").click(function(){
                PhotosliderZoomOut(0);
            });
            $("#PhotoSlider_NameSpace_ToolBarContent_rotateLeft_Node").click(function(){
                PhotoRotateLeft();
            });
            $("#PhotoSlider_NameSpace_ToolBarContent_rotateRight_Node").click(function(){
                PhotoRotateRight();
            });
            
            $("#PhotoSlider_NameSpace_HideToolBar_Node").click(function(){
                if($("#PhotoSlider_NameSpace_ToolBar_Node").css("display")=="block"){
                    $("#PhotoSlider_NameSpace_ToolBar_Node").hide();
                    $("#PhotoSlider_NameSpace_HideToolBar_Node").html("显示工具条");
                }else{
                    $("#PhotoSlider_NameSpace_ToolBar_Node").show();
                    $("#PhotoSlider_NameSpace_HideToolBar_Node").html("隐藏工具条");
                }
            });
            
            
            

            $("#PhotoSlider_NameSpace_ToolBarContent_SaverotatePC_Node").click(function(){
           
               photoslider.uploadRotatePool();
            });

            $("#ToolBarContent_DateModal_Save_cancel_Node").click(function(){
                $('#PhotoSlider_NameSpace_ToolBarContent_DateModal_Node').hide();
         
            });
            if(photoslider.Role!="user" && photoslider.Status=="new"){
            $("#PhotoSlider_NameSpace_ToolBarContent_DateC_Node").click(function(){
                $('#PhotoSlider_NameSpace_ToolBarContent_DateModal_Node').show();
                photoslider.refreshSave();
            });
            $("#PhotoSlider_NameSpace_ToolBarContent_Date_set_Node").click(function(){
                $('#PhotoSlider_NameSpace_ToolBarContent_DateModal_Node').show();
                photoslider.refreshSave();
            });
            
            $("#ToolBarContent_DateModal_Save_save_Node").click(function(){
                photoslider.saveImgIndex();
            });
            
            }
            $("#PhotoSlider_NameSpace_ToolBarContent_delete_Node").click(function(){
                if(confirm("你确定要删除该问诊资料吗？")){
                    photoslider.deleteFile();
                }
            });


            
        }else if(photoslider.DeviceS ==2){
            $("#PhotoSlider_NameSpace_ToolBarContent_rotateIOS_Node").click(function(){
                PhotoRotateRight();
            });
            $("#PhotoSlider_NameSpace_ToolBarContent_deleteIOS_Node").click(function(){
                if(confirm("你确定要删除该问诊资料吗？")){
                    photoslider.deleteFile();
                }
            });
            $("#PhotoSlider_NameSpace_ToolBarContent_index_Node").click(function(){
                $("#PhotoSlider_NameSpace_BackGroundNode").remove();
                photoslider.scrollFunc_Exsist = 0;
    
                refreshReservation();   
                
            });
            $("#PhotoSlider_NameSpace_ToolBarContent_SaverotateIOS_Node").click(function(){
               photoslider.uploadRotatePool();
            });
            
            // $("#PhotoSlider_NameSpace_BackGroundNode").touchmove(function(e){
            //    console.log(e.touches[0]);
            // });
        }
        $("#PhotoSlider_NameSpace_ToolBarContent_Recover_Node").click(function(){
            var a = imgSrcPool[photoslider.Index].width;
            var b = imgSrcPool[photoslider.Index].height;
            photoslider.PhotoSizeRecover(a,b,1);
        });
        $("#PhotoSlider_NameSpace_ToolBarContent_OpenCloseSlider_Node").click(function(){
            OpenClosePhotoSlider();
        });



        $("#PhotoSlider_NameSpace_Swipe_toLeft_Node").click(function(){
            var d = imgSrcPool.length;
            if(photoslider.Index==0){
               photoslider.Index = d - 1 ; 
            }else{
               photoslider.Index--;  
            }
            photoslider.predoswipe(0);
            if(photoslider.DeviceS ==2){
            $("#PhotoSlider_NameSpace_ToolBarContent_SaverotateIOS_Node").hide();   
            }        
            $("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").hide();
            

        });

        $("#PhotoSlider_NameSpace_Swipe_toRight_Node").click(function(){
            var d = imgSrcPool.length;
            if(photoslider.Index == d - 1){
               photoslider.Index = 0 ; 
            }else{
               photoslider.Index++;  
            }
            photoslider.predoswipe(1);
            if(photoslider.DeviceS ==2){
            $("#PhotoSlider_NameSpace_ToolBarContent_SaverotateIOS_Node").hide();   
            }      
            $("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").hide();
        });

        
        $(".PhotoSlider_NameSpace_ToolBarContent_category_Select_Tags_Node").click(function(e){
            var a = e.target.innerHTML;
            photoslider.modReservationFileTag(a);
            $("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").hide();
        });
        if(photoslider.Status =="new" &&photoslider.Role!="user"){
            $("#PhotoSlider_NameSpace_ToolBarContent_category_Node").css("cursor","pointer");
            $("#PhotoSlider_NameSpace_ToolBarContent_category_Node").click(function(){
                if($("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").css("display")=="none"){
                    $("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").show();
                }else{
                    $("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").hide();
                }
                
            });
        }
        
};

photoslider.refreshSave =function(){
    var localserial = photoslider.PhotoArray[photoslider.Index].serial;
    var localserialDepart = [];  
    var status = photoslider.Status;  
        if(localserial!='' && localserial!=null){
	  localserial = localserial.replace("-","/");
      localserial = localserial.replace(",","-");
 

      localserialDepart[0]=localserial.substring(0,localserial.indexOf("/"));
      localserialDepart[1]=localserial.substring(localserial.indexOf("/")+1,localserial.indexOf("/")+3);
      localserialDepart[2]=localserial.substring(localserial.indexOf("/")+4);

			  $("#PhotoSlider_NameSpace_ToolBarContent_Date_set_Node").html(localserial);
            if(localserialDepart[0]){
              $("#ToolBarContent_DateC_Year_Form").val(localserialDepart[0]);
            }
            if(localserialDepart[1]){
              $("#ToolBarContent_DateC_Month_Form").val(localserialDepart[1]);
            }
            if(localserialDepart[2]){
              $("#ToolBarContent_DateC_Index_Form").val(localserialDepart[2]);
            }
            $("#PhotoSlider_NameSpace_ToolBarContent_Date_set_Node").html(localserial);
        }else{
             if(status=="new" && photoslider.Role !="user"){
                $("#PhotoSlider_NameSpace_ToolBarContent_Date_set_Node").html("设置排序编号");
                $("#ToolBarContent_DateC_Year_Form").val("");
                $("#ToolBarContent_DateC_Month_Form").val("");
                $("#ToolBarContent_DateC_Index_Form").val("");
             }else{
                 $("#PhotoSlider_NameSpace_ToolBarContent_Date_set_Node").html("无排序编号");
                        
         }
    }
};

photoslider.deleteFile = function(){
    var a = photoslider.PhotoArray[photoslider.Index];
    var index = photoslider.Index;
    if(photoslider.Role =="specialist"){
        zjmz.upload("removeReservationFileBySpecialist",a.id,a.file,photoslider.StaffId).done(function(){
           $("#PhotoSlider_NameSpace_ToolBarContent_delete_Node").hide();
           photoslider.PhotoArrayL--;
           photoslider.PhotoArray.splice(index,1);
           imgSrcPool.splice(index,1);
           img.splice(index,1);
           if(photoslider.Index == photoslider.PhotoArrayL){
              photoslider.Index = 0; 
           }          
           photoslider.refreshArray();
     
        });
    }else if(photoslider.Role =="assistant"){
        zjmz.upload("removeReservationFileByAssistant",a.id,a.file,photoslider.StaffId).done(function(){
           $("#PhotoSlider_NameSpace_ToolBarContent_delete_Node").hide();              
           photoslider.PhotoArrayL--;         
           photoslider.PhotoArray.splice(index,1);
           imgSrcPool.splice(index,1);
           img.splice(index,1);
           if(photoslider.Index == photoslider.PhotoArrayL){
              photoslider.Index = 0; 
           }
           photoslider.refreshArray();         
        
        });
    }else if(photoslider.Role =="user"){
        zjmz.upload("removeReservationFile",a.id,a.file,zjmz.cookieObject.id).done(function(){
           $("#PhotoSlider_NameSpace_ToolBarContent_delete_Node").hide();
           photoslider.PhotoArrayL--;  
           photoslider.PhotoArray.splice(index,1);
           imgSrcPool.splice(index,1);
           img.splice(index,1);       
           if(photoslider.Index == photoslider.PhotoArrayL){
              photoslider.Index = 0; 
           }           
           photoslider.refreshArray();
     
        });
    }

photoslider.refreshArray = function(){

    photoslider.loadSerial();
    photoslider.LoadImg();
    photoslider.loadCategory();
    photoslider.LoadSImgCache();
    photoslider.checkDelButton();

}

};

photoslider.checkDelButton= function(){
        if(photoslider.Role !="user" &&photoslider.Status=="new"){
         $("#PhotoSlider_NameSpace_ToolBarContent_delete_Node").show();
        }else if(photoslider.Role =="user" &&photoslider.Status=="new"){
            if(!photoslider.PhotoArray[photoslider.Index].tag||photoslider.PhotoArray[photoslider.Index].tag==null||photoslider.PhotoArray[photoslider.Index].tag==""||photoslider.PhotoArray[photoslider.Index].tag=="未分类"){
                $("#PhotoSlider_NameSpace_ToolBarContent_delete_Node").show();     
            }else{
            $("#PhotoSlider_NameSpace_ToolBarContent_delete_Node").hide();  
             }
        }else{
          $("#PhotoSlider_NameSpace_ToolBarContent_delete_Node").hide();       
        }
};

 photoslider.checksideIndex = function(){
     var main = photoslider.Index;
     var long = photoslider.PhotoArrayL;
     if(main == long - 1){
         photoslider.IndexNext = 0;
         photoslider.IndexPre =  photoslider.Index -1;

     }else if(main ==0){
         photoslider.IndexPre = long - 1;
         photoslider.IndexNext = photoslider.Index +1;
     }
 };








photoslider.grabImg = function(){
    if(photoslider.mousedown_Lock == 1){
       
        var WinWidth = $(window).width();
        var WinHeight = $(window).height();
        
      //  if(ImgWidth > WinWidth || ImgHeight > WinHeight){
    var toX = photoslider.mouseX_c;
    var toY = photoslider.mouseY_c;
    var disX = photoslider.mouseX - toX;
    var disY = photoslider.mouseY - toY;
    var imgX = $("#PhotoSlider_NameSpace_MainImg_Node").offset().left;
    var imgY = $("#PhotoSlider_NameSpace_MainImg_Node").offset().top;

            if(photoslider.testRotateifHorizontal() == 0){
            var ImgHeight = $("#PhotoSlider_NameSpace_MainImg_Node").height();
            var ImgWidth = $("#PhotoSlider_NameSpace_MainImg_Node").width();
            }else if(photoslider.testRotateifHorizontal() == 1){
            var ImgHeight = $("#PhotoSlider_NameSpace_MainImg_Node").width();  
            var ImgWidth = $("#PhotoSlider_NameSpace_MainImg_Node").height();
            var rotateFixer = (ImgHeight-ImgWidth)/2;
            }  

    if(photoslider.testRotateifHorizontal() == 0){
    $("#PhotoSlider_NameSpace_MainImg_Node").css("left",toX - photoslider.RelativeX  );
    $("#PhotoSlider_NameSpace_MainImg_Node").css("top",toY - photoslider.RelativeY );
    }else if(photoslider.testRotateifHorizontal() == 1){
    $("#PhotoSlider_NameSpace_MainImg_Node").css("left",toX - photoslider.RelativeX - rotateFixer);
    $("#PhotoSlider_NameSpace_MainImg_Node").css("top",toY - photoslider.RelativeY + rotateFixer);
    }
      //  }


      // 图片拖动切换功能区
      var Win1_3_X = 0.33*WinWidth;
      var Win2_3_X = 0.66*WinWidth; 
      var RightXmove = imgX - Win2_3_X;
      var LeftXmove = Win1_3_X - (imgX+ImgWidth);
      if(imgX > Win2_3_X){
       
        $("#PhotoSlider_NameSpace_preImg_Node").css("transition","0s");
        $("#PhotoSlider_NameSpace_preImg_Node").css("left",-$("#PhotoSlider_NameSpace_preImg_Node").width()+RightXmove);
        
        photoslider.prenextPool[0]=1;
     
      }else if(imgX+ImgWidth < Win1_3_X){
      
        $("#PhotoSlider_NameSpace_nextImg_Node").css("transition","0s");
        $("#PhotoSlider_NameSpace_nextImg_Node").css("left",$(window).width()-LeftXmove);
        photoslider.prenextPool[1]=1;
      
      }else{
          photoslider.prenextPool[0]=0;
          photoslider.prenextPool[1]=0;
          $("#PhotoSlider_NameSpace_preImg_Node").css("left",-$("#PhotoSlider_NameSpace_preImg_Node").width());
          $("#PhotoSlider_NameSpace_nextImg_Node").css("left",$(window).width());
     
      }



    }

    
};
var PhotosliderZoomIn = function(freq){
   var WinHeight = $(window).height();
   var WinWidth = $(window).width();
   var ImgWidth = $("#PhotoSlider_NameSpace_MainImg_Node").width();
   var ImgHeight = $("#PhotoSlider_NameSpace_MainImg_Node").height();
   var times = 0;
   if(freq == 0){
       times = 1.3;
   }else{
       times = 1.4;
   }

   var ImgTop = $("#PhotoSlider_NameSpace_MainImg_Node").offset().top;
   var ImgLeft = $("#PhotoSlider_NameSpace_MainImg_Node").offset().left;
   var ImgWidthAfter = ImgWidth * times;
   var ImgHeighAfter = ImgHeight * times ;
   if(ImgWidthAfter < WinWidth * 2.4){
        $("#PhotoSlider_NameSpace_MainImg_Node").css("width",ImgWidthAfter);
        $("#PhotoSlider_NameSpace_MainImg_Node").css("height",ImgHeighAfter);

        $("#PhotoSlider_NameSpace_MainImg_Node").css("left",WinWidth/2 - ImgWidthAfter/2 );
        $("#PhotoSlider_NameSpace_MainImg_Node").css("top",WinHeight/2 - ImgHeighAfter/2 );
   }
};


var PhotosliderZoomOut = function(freq){
   var WinHeight = $(window).height();
   var WinWidth = $(window).width();
   var ImgWidth = $("#PhotoSlider_NameSpace_MainImg_Node").width();
   var ImgHeight = $("#PhotoSlider_NameSpace_MainImg_Node").height();
   var times = 0;
   if(freq == 0){
       times = 0.7;
   }else{
       times = 0.6;
   }

   var ImgTop = $("#PhotoSlider_NameSpace_MainImg_Node").offset().top;
   var ImgLeft = $("#PhotoSlider_NameSpace_MainImg_Node").offset().left;
   var ImgWidthAfter = ImgWidth * times;
   var ImgHeighAfter = ImgHeight * times;
   if(ImgWidthAfter > 50){
        $("#PhotoSlider_NameSpace_MainImg_Node").css("width",ImgWidthAfter);
        $("#PhotoSlider_NameSpace_MainImg_Node").css("height",ImgHeighAfter);
        $("#PhotoSlider_NameSpace_MainImg_Node").css("left",WinWidth/2 - ImgWidthAfter/2 );
        $("#PhotoSlider_NameSpace_MainImg_Node").css("top",WinHeight/2 - ImgHeighAfter/2 );
   }else{
        $("#PhotoSlider_NameSpace_MainImg_Node").css("width",50);
        $("#PhotoSlider_NameSpace_MainImg_Node").css("height",50/imgSrcPool[photoslider.Index].multip);  
        $("#PhotoSlider_NameSpace_MainImg_Node").css("left",WinWidth/2 - 50/2 );
        $("#PhotoSlider_NameSpace_MainImg_Node").css("top",WinHeight/2 - (50/imgSrcPool[photoslider.Index].multip)/2 );
   };
};

var PhotoRotateLeft = function(){

    var a =  photoslider.rotatePool[photoslider.Index].rotate - 90;
    $("#PhotoSlider_NameSpace_MainImg_Node").css("transform","rotate(" + a +"deg)");

    photoslider.saveRotateChange(a);
    photoslider.initTheLocation(1);
    // photoslider.testRotateIndex(photoslider.rotateIndex);
};

var PhotoRotateRight = function(){

    var a =  photoslider.rotatePool[photoslider.Index].rotate + 90;  
    $("#PhotoSlider_NameSpace_MainImg_Node").css("transform","rotate(" + a +"deg)");  

    photoslider.saveRotateChange(a);
    photoslider.initTheLocation(1);
    
    
    // photoslider.testRotateIndex(photoslider.rotateIndex);

};




photoslider.PhotoSizeRecover = function(ImgWidth,ImgHeight,ifA,ifC){

   var WinHeight = $(window).height();
   var WinWidth = $(window).width();
   
   var ImgWidth = ImgWidth;
   var ImgHeight = ImgHeight; 
   var mutip = imgSrcPool[photoslider.Index].multip;
   var ifa = ifA;

   if(photoslider.DeviceS ==1){
        photoslider.initTheLocation(1);
   }


};


photoslider.phototoLeft = function(){
   photoslider.LoadImg();
   photoslider.loadSerial();
   photoslider.loadtheRotate(0,0);

};
photoslider.phototoRight = function(){
   photoslider.LoadImg();
   photoslider.loadSerial();
   photoslider.loadtheRotate(0,0);
  
   
};



 photoslider.LoadImg = function(){
   var WinHeight = $(window).height();
   var WinWidth = $(window).width();
   var BgHeight = $("#PhotoSlider_NameSpace_BackGroundNode").height();
   var CateWidth = $("#PhotoSlider_NameSpace_ToolBarContent_category_Node").width();
   var ImgWidth = imgSrcPool[photoslider.Index].width;
   var ImgHeight = imgSrcPool[photoslider.Index].height;
   
   $("#PhotoSlider_NameSpace_BackGroundNode").height(WinHeight);
   $("#PhotoSlider_NameSpace_BackGroundNode").width(WinWidth);
   $("#PhotoSlider_NameSpace_ToolBar_Node").width(WinWidth);

   if(photoslider.DeviceS ==1){
   $("#PhotoSlider_NameSpace_ToolBarContent_category_Node").css("right",WinWidth/2 - CateWidth/2 );
   }

   if(photoslider.DeviceS ==1){
    $("#PhotoSlider_NameSpace_ToolBarContent_index_Node").html("<p>"+ (photoslider.Index + 1) + "/" + imgSrcPool.length+"</p>");
   }else if(photoslider.DeviceS ==2){
    $("#PhotoSlider_NameSpace_ToolBarContent_index_Node").html("<span class='ion-chevron-left' style='float:left;font-size:15px;margin-right:2px;'></span><p>"+ (photoslider.Index + 1) + "/" + imgSrcPool.length+"</p>");    
   }
   $("#PhotoSlider_NameSpace_Swipe_toLeft_Node").css("top",WinHeight/2 - 20 );
   $("#PhotoSlider_NameSpace_Swipe_toRight_Node").css("top",WinHeight/2 - 20 );
   $("#PhotoSlider_NameSpace_BackGroundNode").show();

   
   $("#PhotoSlider_NameSpace_BackGroundNode").css("opacity","1");
   $("#PhotoSlider_NameSpace_ToolBar_Node").show();
   $("#PhotoSlider_NameSpace_MainImg_Node").css("backgroundImage","url("+ imgSrcPool[photoslider.Index].src+")");
   
   
 };

 photoslider.loadCategory = function(){
     var status = photoslider.Status;
     if(status =="new"){
         $("#PhotoSlider_NameSpace_ToolBarContent_category_Node").html("<p>"+photoslider.PhotoArray[photoslider.Index].tag+"</p>");
     }else{
         $("#PhotoSlider_NameSpace_ToolBarContent_category_Node").html("<p>"+photoslider.PhotoArray[photoslider.Index].tag+"</p>");
         $("#PhotoSlider_NameSpace_ToolBarContent_category_Node").css("cursor","default");
     }
     $("#PhotoSlider_NameSpace_HideToolBar_Node").html("隐藏工具条");
 };






  photoslider.testRotateIndex =function(index){
      var index = parseInt(index);
      var remainder = index % 4;
      photoslider.RotateRemainder = remainder;
  };
  
  photoslider.fixRotateWidthHeight = function(index){
      var index = parseInt(index);
      var remainder = index % 2;
      return remainder;
  };

 photoslider.scrollFunc_Lock = 0;
 photoslider.scrollFunc_Exsist = 0;

 var scrollFunc=function(e){
    
    if(photoslider.scrollFunc_Lock == 0 && photoslider.scrollFunc_Exsist == 1){
    e = e || window.event;
    var value = 0;
    if(e.wheelDelta){
        value = e.wheelDelta / 120;
    }else{
        value = e.detail / -3;
    };
     $("#PhotoSlider_NameSpace_MainImg_Node").css("transition","all 0.1s");
    photoslider.scrollFunc_Lock = 1;
    setTimeout("photoslider.scrollFunc_Lock = 0",130);
    if(value>0){        
        PhotosliderZoomIn(1);
    }else if (value<0){
        PhotosliderZoomOut(1);
    };


    }
    };
    if(document.addEventListener){
        document.addEventListener('DOMMouseScroll',scrollFunc,false);
    }
    window.onmousewheel=document.onmousewheel=scrollFunc;


    photoslider.saveImgIndex = function(){
        var yearReg = /[1-9]\d{3}/ ;
        var monthReg = /^(0?[[1-9]|1[0-2])$/ ;
      //  var dayReg = /^(0?[[1-9]|1[0-9]|2[0-9]|3[0-1])$/ ;
        var indexReg = /^0?[1-9]\d*$/;
        var year = $("#ToolBarContent_DateC_Year_Form").val();
        var month = $("#ToolBarContent_DateC_Month_Form").val();
        // var day = $("#ToolBarContent_DateC_Day_Form").val();
        var index = $("#ToolBarContent_DateC_Index_Form").val();

        if(yearReg.test(year)){
            if(monthReg.test(month)){
                // if(dayReg.test(day)){
                    if(month.length==1){
                        month ="0"+month;
                    }
                    if(index!='' && index!=null){
                        if(indexReg.test(index)){   
                            if(index.length==1){
                            index ="0"+index;
                              }                         
                            photoslider.Serial = year + "-" + month + "," + index;
                            photoslider.preLoadSaveSerial();
                        }else{
                           alert("请输入正确的序号");  
                        }
                    }else{
                        photoslider.Serial = year + "-" + month;
                        photoslider.preLoadSaveSerial();
                    }
                // }else{
                //   $("#ToolBarContent_DateC_Day_Form").css("color","red");     
                // }
            }else{
              alert("请输入正确的月份");
            }
        }else{
          alert("请输入正确的年份");  
        }
    };

    photoslider.preLoadSaveSerial = function(){
        if(photoslider.Role == "specialist"){
            photoslider.specialistSaveSerial();
        }else if (photoslider.Role =="assistant"){
            photoslider.assistantSaveSerial();
        }
    };

   

    photoslider.modReservationFileTag = function(tags){
        zjmz.rpc('modReservationFileTag',photoslider.PhotoArray[photoslider.Index].id,tags).done(function(data) { 
            photoslider.PhotoArray[photoslider.Index].tag = tags;
            photoslider.loadCategory();
            $(".PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").hide();
        }).fail(function(data){
            console.log("modReservationFileTagFailed");
        });
    };

    photoslider.specialistSaveSerial = function(){
        zjmz.rpc('modReservationFileSerialBySpecialist',photoslider.PhotoArray[photoslider.Index].id,photoslider.Serial,zjmz.cookieObject.id).done(function(data) { 
       
            $('#PhotoSlider_NameSpace_ToolBarContent_DateModal_Node').hide();
            photoslider.PhotoArray[photoslider.Index].serial = photoslider.Serial;
            photoslider.loadSerial();
        }).fail(function(data){
            console.log("SpecialistSaveSerialFailed");
        });
    };
    photoslider.assistantSaveSerial = function(){
        zjmz.rpc('modReservationFileSerialByAssistant',photoslider.PhotoArray[photoslider.Index].id,photoslider.Serial,zjmz.cookieObject.id).done(function(data) { 
          
            $('#PhotoSlider_NameSpace_ToolBarContent_DateModal_Node').hide();
            photoslider.PhotoArray[photoslider.Index].serial = photoslider.Serial;
            photoslider.loadSerial();
        }).fail(function(data){
            console.log("AssistantSaveSerialFailed");
        });
    };

    photoslider.refreshSideImg =function(){
        if(photoslider.PhotoArrayL ==1){
            var preIndex = 0;
            var nextIndex = 0; 
        }else{
            if(photoslider.Index==0){
                var preIndex = photoslider.PhotoArrayL - 1;
                var nextIndex = 1; 
            }else if(photoslider.Index==photoslider.PhotoArrayL - 1){
                var nextIndex = 0;
                var preIndex =  photoslider.Index -1;
            }else{
                var preIndex = photoslider.Index-1;
                var nextIndex =photoslider.Index+1;
            }
        }

        $("#PhotoSlider_NameSpace_preImg_Node").width(imgSrcPool[preIndex].width);
        $("#PhotoSlider_NameSpace_nextImg_Node").width(imgSrcPool[nextIndex].width);
        $("#PhotoSlider_NameSpace_preImg_Node").height(imgSrcPool[preIndex].height);
        $("#PhotoSlider_NameSpace_nextImg_Node").height(imgSrcPool[nextIndex].height);
        $("#PhotoSlider_NameSpace_preImg_Node").css("top",$(window).height()/2-$("#PhotoSlider_NameSpace_preImg_Node").height()/2);
        $("#PhotoSlider_NameSpace_nextImg_Node").css("top",$(window).height()/2-$("#PhotoSlider_NameSpace_nextImg_Node").height()/2);
        $("#PhotoSlider_NameSpace_nextImg_Node").css("left",$(window).width());
        $("#PhotoSlider_NameSpace_preImg_Node").css("left",-$("#PhotoSlider_NameSpace_preImg_Node").width());
        $("#PhotoSlider_NameSpace_preImg_Node").css("backgroundImage","url("+imgSrcPool[preIndex].src+")");
        $("#PhotoSlider_NameSpace_nextImg_Node").css("backgroundImage","url("+imgSrcPool[nextIndex].src+")");
    };

    photoslider.loadSerial = function(){
        var localserial = photoslider.PhotoArray[photoslider.Index].serial;
        var localserialDepart = [];  
        var status = photoslider.Status;  
             if(localserial!='' && localserial!=null){
                localserial = localserial.replace("-","/");
                localserial = localserial.replace(",","-");
            

                localserialDepart[0]=localserial.substring(0,localserial.indexOf("/"));
                localserialDepart[1]=localserial.substring(localserial.indexOf("/")+1,localserial.indexOf("/")+3);
                localserialDepart[2]=localserial.substring(localserial.indexOf("/")+4);

                $("#PhotoSlider_NameSpace_ToolBarContent_Date_set_Node").html(localserial);
                if(localserialDepart[0]){
                $("#ToolBarContent_DateC_Year_Form").val(localserialDepart[0]);
                }
                if(localserialDepart[1]){
                $("#ToolBarContent_DateC_Month_Form").val(localserialDepart[1]);
                }
                if(localserialDepart[2]){
                $("#ToolBarContent_DateC_Index_Form").val(localserialDepart[2]);
                }
                $("#PhotoSlider_NameSpace_ToolBarContent_Date_set_Node").html(localserial);
            }else{
                if(status=="new" && photoslider.Role !="user"){
                    $("#PhotoSlider_NameSpace_ToolBarContent_Date_set_Node").html("设置排序编号");
                    $("#ToolBarContent_DateC_Year_Form").val("");
                    $("#ToolBarContent_DateC_Month_Form").val("");
                    $("#ToolBarContent_DateC_Index_Form").val("");
                }else{
                    $("#PhotoSlider_NameSpace_ToolBarContent_Date_set_Node").html("无排序编号");
                    $("#PhotoSlider_NameSpace_ToolBarContent_DateModal_Node").hide();
                }

        }
    };

    photoslider.loadtheRotate = function(ifA,ifR){
        if(ifA ==0){
            $("#PhotoSlider_NameSpace_MainImg_Node").css("transition","all 0s");
        }   
        if(ifR==1){
             var a = photoslider.rotatePool[photoslider.Index].rotatefix;
             photoslider.rotatePool[photoslider.Index].rotate= a;
        }else{
             var a = photoslider.rotatePool[photoslider.Index].rotate;
            
        }
        if(a!=null && a!=""){
              $("#PhotoSlider_NameSpace_MainImg_Node").css("transform","rotate(" + a +"deg)");  
            //   photoslider.rotateIndex = parseInt( a / 90 );
        }else{
              $("#PhotoSlider_NameSpace_MainImg_Node").css("transform","rotate(0deg)");  
        }
        
    };


    photoslider.saveRotateChange = function(a){

        photoslider.rotatePool[photoslider.Index].rotate = a;
        photoslider.rotatePool[photoslider.Index].ifchanged = 1;
        if(photoslider.Role !="user" &&photoslider.Status=="new"){
         $("#PhotoSlider_NameSpace_ToolBarContent_SaverotatePC_Node").show();
        }else if(photoslider.Role =="user" &&photoslider.Status=="new"){
            if(!photoslider.PhotoArray[photoslider.Index].tag||photoslider.PhotoArray[photoslider.Index].tag==null||photoslider.PhotoArray[photoslider.Index].tag==""||photoslider.PhotoArray[photoslider.Index].tag=="未分类"){
                $("#PhotoSlider_NameSpace_ToolBarContent_SaverotatePC_Node").show();
            }else{
                $("#PhotoSlider_NameSpace_ToolBarContent_SaverotatePC_Node").hide(); 
            }
        }else{
           $("#PhotoSlider_NameSpace_ToolBarContent_SaverotatePC_Node").hide(); 
        }
    };  


    photoslider.testRotateifHorizontal =function(){
        var a = photoslider.rotatePool[photoslider.Index].rotate;
        if((a/90) % 2 ==0){
            return 0;
        }else if ((a/90) % 2 !=0){
            return 1;
        }
       
    };


    photoslider.uploadRotatePool = function(){
       // for(var i = 0 ; i < photoslider.rotatePool.length;i++){
            if(photoslider.rotatePool[photoslider.Index].ifchanged ==1 && photoslider.Role == "specialist" && photoslider.Status=="new"){
                zjmz.rpc("rotateReservationFileBySpecialist",photoslider.rotatePool[photoslider.Index].id,photoslider.StaffId,photoslider.rotatePool[photoslider.Index].rotate).done(function(data){
                    if(photoslider.DeviceS ==2){
      
                    $("#PhotoSlider_NameSpace_ToolBarContent_SaverotateIOS_Node").hide();
                    }else{
                    $("#PhotoSlider_NameSpace_ToolBarContent_SaverotatePC_Node").hide();
                    }
                    photoslider.rotatePool[photoslider.Index].ifchanged = 0;
                
                }).fail(function(){
        
                    console.log("保存失败");
                });
            }else if (photoslider.rotatePool[photoslider.Index].ifchanged ==1 && photoslider.Role == "assistant" && photoslider.Status=="new"){
                zjmz.rpc("rotateReservationFileByAssistant",photoslider.rotatePool[photoslider.Index].id,photoslider.StaffId,photoslider.rotatePool[photoslider.Index].rotate).done(function(data){
                   if(photoslider.DeviceS ==2){
           
                    $("#PhotoSlider_NameSpace_ToolBarContent_SaverotateIOS_Node").hide();
                    }else{
                    $("#PhotoSlider_NameSpace_ToolBarContent_SaverotatePC_Node").hide();
                    }         
                    photoslider.rotatePool[photoslider.Index].ifchanged = 0;
                }).fail(function(){
         
                });

            }else if(photoslider.rotatePool[photoslider.Index].ifchanged ==1 && photoslider.Role == "user" && photoslider.Status=="new"){
                zjmz.rpc("rotateReservationFileByUser",photoslider.rotatePool[photoslider.Index].id,zjmz.cookieObject.id,photoslider.rotatePool[photoslider.Index].rotate).done(function(data){
                   if(photoslider.DeviceS ==2){
                    $("#PhotoSlider_NameSpace_ToolBarContent_SaverotateIOS_Node").hide();
                    }else{
                    $("#PhotoSlider_NameSpace_ToolBarContent_SaverotatePC_Node").hide();
                    }         
                    photoslider.rotatePool[photoslider.Index].ifchanged = 0;
                }).fail(function(){
                
                });
            }
      //  }
    };


    photoslider.initRotatePool =function(){
        photoslider.rotatePool = new Array();
        var long = photoslider.PhotoArray.length;
        for(var i = 0; i<long;i++){
            photoslider.rotatePool[i]= {};
            photoslider.rotatePool[i].id = photoslider.PhotoArray[i].id;
            photoslider.rotatePool[i].rotate = photoslider.PhotoArray[i].rotate;
            photoslider.rotatePool[i].rotatefix = photoslider.PhotoArray[i].rotate;
            photoslider.rotatePool[i].ifchanged = 0;
        }
        photoslider.loadtheRotate(0,0);
        
    };

    photoslider.getImgSize = function(filename){
        var size = [];
        var extP = filename.lastIndexOf(".");
        var linkP = filename.lastIndexOf("x");
        var startP = filename.lastIndexOf("-");
        var widthLength = linkP - startP;
        var heightLength = extP - linkP;
        var width = filename.substr(startP+1,widthLength-1);
        var height = filename.substr(linkP+1,heightLength-1);
        size[0]=width;
        size[1]=height;
        return size;
    };

    photoslider.checkRotateSaveButton = function(){
        if(photoslider.rotatePool[photoslider.Index].ifchanged ==1){
        
            if(photoslider.Role !="user" &&photoslider.Status=="new"){
            $("#PhotoSlider_NameSpace_ToolBarContent_SaverotatePC_Node").show();
            }else if(photoslider.Role =="user" &&photoslider.Status=="new"){
                if(!photoslider.PhotoArray[photoslider.Index].tag||photoslider.PhotoArray[photoslider.Index].tag==null||photoslider.PhotoArray[photoslider.Index].tag==""||photoslider.PhotoArray[photoslider.Index].tag=="未分类"){
                    $("#PhotoSlider_NameSpace_ToolBarContent_SaverotatePC_Node").show();
                }else{
                    $("#PhotoSlider_NameSpace_ToolBarContent_SaverotatePC_Node").hide(); 
                }
            }
        }else{
           $("#PhotoSlider_NameSpace_ToolBarContent_SaverotatePC_Node").hide();  
        }
    };



this.photoslider = photoslider ;
})();


