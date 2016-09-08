function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

    var ioncss = "<link href='http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' rel='stylesheet'>";
    $('head').html($('head').html() + ioncss);
    var photoslider = {};
    this.photoslider = photoslider;
    $(window).scroll(function (event) {
        if (photoslider.ifPhotosliderWork == 1) {
            $(window).scrollLeft(0);
            $(window).scrollTop(0);
        }
    });

    photoslider.ifmove = 0;

    $(window).mousemove(function (e) {
        photoslider.ifmove = 1;
        if (photoslider.mousedown_Lock == 1 && photoslider.ifPhotosliderWork == 1 && e.target.id == "PhotoSlider_NameSpace_Img_Mask_Node") {
            photoslider.mouseX_c = e.pageX;
            photoslider.mouseY_c = e.pageY;
            photoslider.grabImg();
        }
    });

    $(window).dblclick(function (e) {
        if (photoslider.ifPhotosliderWork == 1 && e.target.id == "PhotoSlider_NameSpace_Img_Mask_Node") {
            var a = imgSrcPool[photoslider.Index].width;
            var b = imgSrcPool[photoslider.Index].height;
            photoslider.PhotoSizeRecover(a, b, 1);
        }
    });

    $(window).mousedown(function (e) {
        photoslider.ifmove = 0;
        if (photoslider.ifPhotosliderWork == 1) {
            var x = e.pageX;
            var y = e.pageY;
            photoslider.mouseX = x;
            photoslider.mouseY = y;
            photoslider.RelativeX = x - $("#PhotoSlider_NameSpace_MainImg_Node").offset().left;
            photoslider.RelativeY = y - $("#PhotoSlider_NameSpace_MainImg_Node").offset().top;
            photoslider.mousedown_Lock = 1;
            $("#PhotoSlider_NameSpace_MainImg_Node").css("transition", "all 0s");
        }
    });

    $(window).mouseup(function () {
        if (photoslider.ifPhotosliderWork == 1) {

            $("#PhotoSlider_NameSpace_MainImg_Node").css("transition", "all 0.2s");
            photoslider.mousedown_Lock = 0;
            var x = $("#PhotoSlider_NameSpace_MainImg_Node").offset().left;
            var y = $("#PhotoSlider_NameSpace_MainImg_Node").offset().top;
            if (photoslider.testRotateifHorizontal() == 0) {
                var iw = $("#PhotoSlider_NameSpace_MainImg_Node").width();
                var ih = $("#PhotoSlider_NameSpace_MainImg_Node").height();
            } else if (photoslider.testRotateifHorizontal() == 1) {
                var iw = $("#PhotoSlider_NameSpace_MainImg_Node").height();
                var ih = $("#PhotoSlider_NameSpace_MainImg_Node").width();
            }
            var ax = $(window).width();
            var ay = $(window).height();
            var x_r = ax - (x + iw);
            var y_b = ay - (y + ih);
            if (photoslider.prenextPool[0] == 1 || photoslider.prenextPool[1] == 1) {
                //pre next 画框转变为主画框

                if (photoslider.prenextPool[0] == 1) {
                    var location = $("#PhotoSlider_NameSpace_preImg_Node").offset().left;
                    var locationtop = $("#PhotoSlider_NameSpace_preImg_Node").offset().top;
                    //主次画框替换
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("transition", "0s");
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("left", location);
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("top", locationtop);
                    $("#PhotoSlider_NameSpace_MainImg_Node").width($("#PhotoSlider_NameSpace_preImg_Node").width());
                    $("#PhotoSlider_NameSpace_MainImg_Node").height($("#PhotoSlider_NameSpace_preImg_Node").height());

                    var d = imgSrcPool.length;
                    if (photoslider.Index == 0) {
                        photoslider.Index = d - 1;
                    } else {
                        photoslider.Index--;
                    }
                    photoslider.predoswipe(0);

                    $("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").hide();
                    photoslider.refreshSideImg();

                    photoslider.prenextPool[0] = 0;
                } else if (photoslider.prenextPool[1] == 1) {
                    var location = $("#PhotoSlider_NameSpace_nextImg_Node").offset().left;
                    var locationtop = $("#PhotoSlider_NameSpace_nextImg_Node").offset().top;

                    //主次画框替换
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("transition", "0s");
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("top", locationtop);
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("left", location);
                    $("#PhotoSlider_NameSpace_MainImg_Node").width($("#PhotoSlider_NameSpace_nextImg_Node").width());
                    $("#PhotoSlider_NameSpace_MainImg_Node").height($("#PhotoSlider_NameSpace_nextImg_Node").height());
                    var d = imgSrcPool.length;
                    if (photoslider.Index == d - 1) {
                        photoslider.Index = 0;
                    } else {
                        photoslider.Index++;
                    }
                    photoslider.predoswipe(1);

                    $("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").hide();

                    photoslider.refreshSideImg();
                    photoslider.prenextPool[1] = 0;
                }
            } else {
                if (photoslider.ifmove == 1) {
                    if (photoslider.testRotateifHorizontal() == 0) {
                        if (iw > ax && ih > ay) {
                            if (x > 0 && iw > ax && ih > ay) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("left", 0);
                            } else if (ax - (x + iw) > 0 && iw > ax && ih > ay) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("left", ax - iw);
                            }
                            if (ay - (y + ih) > 0 && ih > ay && iw > ax) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("top", ay - ih);
                            } else if (y > 0 && ih > ay && iw > ax) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("top", 0);
                            }
                        } else if (iw > ax && ih <= ay) {
                            if (x > 0) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("left", 0);
                            } else if (ax - (x + iw) > 0) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("left", ax - iw);
                            }
                            $("#PhotoSlider_NameSpace_MainImg_Node").css("top", ay / 2 - ih / 2);
                        } else if (iw <= ax && ih > ay) {
                            if (ay - (y + ih) > 0) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("top", ay - ih);
                            } else if (y > 0) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("top", 0);
                            }
                            $("#PhotoSlider_NameSpace_MainImg_Node").css("left", ax / 2 - iw / 2);
                        } else if (iw <= ax && ih <= ay) {
                            $("#PhotoSlider_NameSpace_MainImg_Node").css("left", ax / 2 - iw / 2);
                            $("#PhotoSlider_NameSpace_MainImg_Node").css("top", ay / 2 - ih / 2);
                        }
                    } else if (photoslider.testRotateifHorizontal() == 1) {
                        var rotateFixer = (iw - ih) / 2;
                        if (iw > ax && ih > ay) {
                            if (x > 0 && iw > ax && ih > ay) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("left", 0 + rotateFixer);
                            } else if (ax - (x + iw) > 0 && iw > ax && ih > ay) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("left", ax - iw + rotateFixer);
                            }
                            if (ay - (y + ih) > 0 && ih > ay && iw > ax) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("top", ay - ih - rotateFixer);
                            } else if (y > 0 && ih > ay && iw > ax) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("top", 0 - rotateFixer);
                            }
                        } else if (iw > ax && ih <= ay) {
                            if (x > 0) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("left", 0 + rotateFixer);
                            } else if (ax - (x + iw) > 0) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("left", ax - iw + rotateFixer);
                            }
                            $("#PhotoSlider_NameSpace_MainImg_Node").css("top", ay / 2 - ih / 2 - rotateFixer);
                        } else if (iw <= ax && ih > ay) {
                            if (ay - (y + ih) > 0) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("top", ay - ih - rotateFixer);
                            } else if (y > 0) {
                                $("#PhotoSlider_NameSpace_MainImg_Node").css("top", 0 - rotateFixer);
                            }

                            $("#PhotoSlider_NameSpace_MainImg_Node").css("left", ax / 2 - iw / 2 + rotateFixer);
                        } else if (iw <= ax && ih <= ay) {
                            $("#PhotoSlider_NameSpace_MainImg_Node").css("left", ax / 2 - iw / 2 + rotateFixer);
                            $("#PhotoSlider_NameSpace_MainImg_Node").css("top", ay / 2 - ih / 2 - rotateFixer);
                        }
                    }
                    photoslider.ifmove = 0;
                }
            }
        }
    });

    photoslider.initModal = function () {
        $(window).scrollLeft(0);
        $(window).scrollTop(0);
        $('body').attr("style", "overflow:hidden");
    };

    photoslider.open = function (PhotoArray, Index) {
        $("#photosliderfixer").height($(window).height());
        photoslider.Index = Index;
        photoslider.IndexPre = 0;
        photoslider.IndexNext = 0;
        photoslider.PhotoArray = PhotoArray;
        photoslider.PhotoArrayL = PhotoArray.length;
        photoslider.MainImgReady = 0;

        photoslider.prenextPool = [];
        imgSrcPool = new Array(photoslider.PhotoArrayL);
        img = new Array(photoslider.PhotoArrayL);
        photoslider.scrollcache = $("html").scrollTop();
        photoslider.initModal();

        for (var i = 0; i < photoslider.PhotoArrayL; i++) {
            imgSrcPool[i] = {};
            imgSrcPool[i].timer = 1;
            imgSrcPool[i].sizeFlag = false;
            imgSrcPool[i].src = photoslider.PhotoArray[i].file;
            imgSrcPool[i].index = i;
            imgSrcPool[i].instance = new ImgSizeScanner(imgSrcPool[i].src, i);

            
        }
        photoslider.alLocation();
    };

    photoslider.alLocation = function () {
        var count = [];
        //先读指定的
        if(imgSrcPool[photoslider.Index].sizeFlag == false){
            count.push(photoslider.Index);
        }
        for (var i = 0; i < imgSrcPool.length; i++) {
            if(i ==photoslider.Index){
                continue;
            }
            if (imgSrcPool[i].sizeFlag == false) {
                count.push(i);
            }
        }
        if (count.length != 0) {
            if (count.length >= 3) {
                var list = [count[0], count[1], count[2]];
                for (var k = 0; k < list.length; k++) {
                    imgSrcPool[list[k]].instance.createImg();
                }
                photoslider.checkSizeReady(list);
            } else {
                var list = count;
                for (var k = 0; k < count.length; k++) {
                    imgSrcPool[count[k]].instance.createImg();
                }
                photoslider.checkSizeReady(list);
            }
        } else {
            if(photoslider.MainImgReady == 0){     
                photoslider.LoadMImgCache();
            }
            return;
        }
    };

    

    photoslider.LoadMImgCache = function () {
        photoslider.checkMainAlready();
    };

    photoslider.LoadSImgCache = function () {
        photoslider.checkSideImg();
    };

    photoslider.checkMainAlready = function () {
        photoslider.openMain();
        photoslider.LoadSImgCache();
    };

    photoslider.checkSideImg = function (index) {

        photoslider.refreshSideImg();
    };

    photoslider.openMain = function () {

        photoslider.ifPhotosliderWork = 1;

        var Background_Node = document.createElement("div");
        Background_Node.setAttribute("id", "PhotoSlider_NameSpace_BackGroundNode");
        Background_Node.style.backgroundColor = "#000b15";
        Background_Node.style.left = "0px";
        Background_Node.style.top = "0px";
        Background_Node.style.width = "100%";
        Background_Node.style.height = "100%";
        Background_Node.style.position = "absolute";
        Background_Node.style.zIndex = "99";
        Background_Node.style.display = "none";
        Background_Node.style.transition = "all 0.4s";
        Background_Node.style.opacity = "0";
        Background_Node.style.overflow = "hidden";

        var Img_Mask_Node = document.createElement("div");
        Img_Mask_Node.setAttribute("id", "PhotoSlider_NameSpace_Img_Mask_Node");
        Img_Mask_Node.style.backgroundColor = "red";
        Img_Mask_Node.style.left = "0px";
        Img_Mask_Node.style.top = "0px";
        Img_Mask_Node.style.width = "100%";
        Img_Mask_Node.style.height = "100%";
        Img_Mask_Node.style.position = "absolute";
        Img_Mask_Node.style.zIndex = "101";
        Img_Mask_Node.style.display = "block";
        Img_Mask_Node.style.opacity = "0";
        Img_Mask_Node.style.overflow = "hidden";
        Img_Mask_Node.color = "red";
        Img_Mask_Node.setAttribute("onselectstart", "return false");
        Img_Mask_Node.style.MozUserSelect = "none";

        var ToolBar_Node = document.createElement("div");
        ToolBar_Node.setAttribute("id", "PhotoSlider_NameSpace_ToolBar_Node");
        ToolBar_Node.style.position = "absolute";
        ToolBar_Node.style.zIndex = "102";
        ToolBar_Node.style.width = "240px";
        ToolBar_Node.style.height = "30px";
        ToolBar_Node.style.right = "0px";
        ToolBar_Node.style.backgroundColor = "#000b15";
        ToolBar_Node.style.opacity = "0.7";
        ToolBar_Node.style.display = "block";

        var ToolBarContent_exit_Node = document.createElement("span");
        ToolBarContent_exit_Node.setAttribute("id", "PhotoSlider_NameSpace_ToolBarContent_exit_Node");
        ToolBarContent_exit_Node.setAttribute("class", "ion-close");
        ToolBarContent_exit_Node.style.zIndex = "102";
        ToolBarContent_exit_Node.style.cursor = "pointer";
        ToolBarContent_exit_Node.style.position = "absolute";
        ToolBarContent_exit_Node.style.width = "50px";
        ToolBarContent_exit_Node.style.height = "30px";
        ToolBarContent_exit_Node.style.top = "0px";
        ToolBarContent_exit_Node.style.lineHeight = "30px";
        ToolBarContent_exit_Node.style.right = "10px";
        ToolBarContent_exit_Node.style.color = "white";
        ToolBarContent_exit_Node.style.textAlign = "center";

        var ToolBarContent_rotateLeft_Node = document.createElement("span");
        ToolBarContent_rotateLeft_Node.setAttribute("id", "PhotoSlider_NameSpace_ToolBarContent_rotateLeft_Node");
        ToolBarContent_rotateLeft_Node.setAttribute("class", "ion-reply");
        ToolBarContent_rotateLeft_Node.style.fontSize = "20px";
        ToolBarContent_rotateLeft_Node.style.zIndex = "102";
        ToolBarContent_rotateLeft_Node.style.cursor = "pointer";
        ToolBarContent_rotateLeft_Node.style.position = "absolute";
        ToolBarContent_rotateLeft_Node.style.width = "50px";
        ToolBarContent_rotateLeft_Node.style.height = "30px";
        ToolBarContent_rotateLeft_Node.style.top = "0px";
        ToolBarContent_rotateLeft_Node.style.lineHeight = "30px";
        ToolBarContent_rotateLeft_Node.style.right = "110px";
        ToolBarContent_rotateLeft_Node.style.color = "white";
        ToolBarContent_rotateLeft_Node.style.textAlign = "center";

        var ToolBarContent_rotateRight_Node = document.createElement("span");
        ToolBarContent_rotateRight_Node.setAttribute("id", "PhotoSlider_NameSpace_ToolBarContent_rotateRight_Node");
        ToolBarContent_rotateRight_Node.setAttribute("class", "ion-forward");
        ToolBarContent_rotateRight_Node.style.fontSize = "20px";
        ToolBarContent_rotateRight_Node.style.zIndex = "102";
        ToolBarContent_rotateRight_Node.style.cursor = "pointer";
        ToolBarContent_rotateRight_Node.style.position = "absolute";
        ToolBarContent_rotateRight_Node.style.width = "50px";
        ToolBarContent_rotateRight_Node.style.height = "30px";
        ToolBarContent_rotateRight_Node.style.top = "0px";
        ToolBarContent_rotateRight_Node.style.lineHeight = "30px";
        ToolBarContent_rotateRight_Node.style.right = "60px";
        ToolBarContent_rotateRight_Node.style.color = "white";
        ToolBarContent_rotateRight_Node.style.textAlign = "center";

        var ToolBarContent_ZoomOut_Node = document.createElement("span");
        ToolBarContent_ZoomOut_Node.setAttribute("id", "PhotoSlider_NameSpace_ToolBarContent_ZoomOut_Node");
        ToolBarContent_ZoomOut_Node.setAttribute("class", "ion-arrow-shrink");
        ToolBarContent_ZoomOut_Node.style.fontSize = "20px";
        ToolBarContent_ZoomOut_Node.style.zIndex = "102";
        ToolBarContent_ZoomOut_Node.style.cursor = "pointer";
        ToolBarContent_ZoomOut_Node.style.position = "absolute";
        ToolBarContent_ZoomOut_Node.style.width = "50px";
        ToolBarContent_ZoomOut_Node.style.height = "30px";
        ToolBarContent_ZoomOut_Node.style.top = "0px";
        ToolBarContent_ZoomOut_Node.style.lineHeight = "30px";
        ToolBarContent_ZoomOut_Node.style.right = "160px";
        ToolBarContent_ZoomOut_Node.style.color = "white";
        ToolBarContent_ZoomOut_Node.style.textAlign = "center";

        var ToolBarContent_ZoomIn_Node = document.createElement("span");
        ToolBarContent_ZoomIn_Node.setAttribute("id", "PhotoSlider_NameSpace_ToolBarContent_ZoomIn_Node");
        ToolBarContent_ZoomIn_Node.setAttribute("class", "ion-arrow-expand");
        ToolBarContent_ZoomIn_Node.style.fontSize = "20px";
        ToolBarContent_ZoomIn_Node.style.zIndex = "102";
        ToolBarContent_ZoomIn_Node.style.cursor = "pointer";
        ToolBarContent_ZoomIn_Node.style.position = "absolute";
        ToolBarContent_ZoomIn_Node.style.width = "50px";
        ToolBarContent_ZoomIn_Node.style.height = "30px";
        ToolBarContent_ZoomIn_Node.style.top = "0px";
        ToolBarContent_ZoomIn_Node.style.lineHeight = "30px";
        ToolBarContent_ZoomIn_Node.style.right = "210px";
        ToolBarContent_ZoomIn_Node.style.color = "white";
        ToolBarContent_ZoomIn_Node.style.textAlign = "center";

        var ToolBarContent_Recover_Node = document.createElement("span");
        ToolBarContent_Recover_Node.setAttribute("id", "PhotoSlider_NameSpace_ToolBarContent_Recover_Node");
        ToolBarContent_Recover_Node.setAttribute("class", "ion-loop");
        ToolBarContent_Recover_Node.style.fontSize = "20px";
        ToolBarContent_Recover_Node.style.zIndex = "102";
        ToolBarContent_Recover_Node.style.cursor = "pointer";
        ToolBarContent_Recover_Node.style.position = "absolute";
        ToolBarContent_Recover_Node.style.width = "50px";
        ToolBarContent_Recover_Node.style.height = "30px";
        ToolBarContent_Recover_Node.style.top = "0px";
        ToolBarContent_Recover_Node.style.lineHeight = "30px";
        ToolBarContent_Recover_Node.style.right = "260px";
        ToolBarContent_Recover_Node.style.color = "white";
        ToolBarContent_Recover_Node.style.textAlign = "center";

        var ToolBarContent_index_Node = document.createElement("span");
        ToolBarContent_index_Node.setAttribute("id", "PhotoSlider_NameSpace_ToolBarContent_index_Node");
        ToolBarContent_index_Node.style.zIndex = "102";
        ToolBarContent_index_Node.innerHTML = "";
        ToolBarContent_index_Node.style.position = "absolute";
        ToolBarContent_index_Node.style.width = "60px";
        ToolBarContent_index_Node.style.height = "30px";
        ToolBarContent_index_Node.style.top = "0px";
        ToolBarContent_index_Node.style.lineHeight = "30px";
        ToolBarContent_index_Node.style.left = "10px";
        ToolBarContent_index_Node.style.textAlign = "center";
        ToolBarContent_index_Node.style.margin = "0px";
        ToolBarContent_index_Node.style.color = "white";

        var nextImg_Node = document.createElement("div");
        nextImg_Node.setAttribute("id", "PhotoSlider_NameSpace_nextImg_Node");
        nextImg_Node.style.zIndex = "100";
        nextImg_Node.innerHTML = "";
        nextImg_Node.style.backgroundImage = "";
        nextImg_Node.style.backgroundSize = "cover";
        nextImg_Node.style.position = "absolute";

        var preImg_Node = document.createElement("div");
        preImg_Node.setAttribute("id", "PhotoSlider_NameSpace_preImg_Node");
        preImg_Node.style.zIndex = "100";
        preImg_Node.innerHTML = "";
        preImg_Node.style.backgroundImage = "";
        preImg_Node.style.backgroundSize = "cover";
        preImg_Node.style.position = "absolute";

        var ToolBarContent_OpenCloseSlider_Node = document.createElement("span");
        ToolBarContent_OpenCloseSlider_Node.setAttribute("id", "PhotoSlider_NameSpace_ToolBarContent_OpenCloseSlider_Node");
        ToolBarContent_OpenCloseSlider_Node.style.zIndex = "102";
        ToolBarContent_OpenCloseSlider_Node.innerHTML = "开关缩略图";
        ToolBarContent_OpenCloseSlider_Node.style.cursor = "pointer";
        ToolBarContent_OpenCloseSlider_Node.style.position = "absolute";
        ToolBarContent_OpenCloseSlider_Node.style.width = "100px";
        ToolBarContent_OpenCloseSlider_Node.style.height = "30px";
        ToolBarContent_OpenCloseSlider_Node.style.top = "0px";
        ToolBarContent_OpenCloseSlider_Node.style.lineHeight = "30px";
        ToolBarContent_OpenCloseSlider_Node.style.left = "230px";
        ToolBarContent_OpenCloseSlider_Node.style.backgroundColor = "yellow";
        ToolBarContent_OpenCloseSlider_Node.style.textAlign = "center";

        var Swipe_toLeft_Node = document.createElement("span");
        Swipe_toLeft_Node.setAttribute("id", "PhotoSlider_NameSpace_Swipe_toLeft_Node");
        Swipe_toLeft_Node.setAttribute("class", "ion-arrow-left-b");
        Swipe_toLeft_Node.style.zIndex = "110";
        Swipe_toLeft_Node.style.fontSize = "40px";
        Swipe_toLeft_Node.style.cursor = "pointer";
        Swipe_toLeft_Node.style.position = "absolute";
        Swipe_toLeft_Node.style.width = "40px";
        Swipe_toLeft_Node.style.height = "40px";
        Swipe_toLeft_Node.style.top = "0px";
        Swipe_toLeft_Node.style.lineHeight = "40px";
        Swipe_toLeft_Node.style.left = "0px";
        Swipe_toLeft_Node.style.color = "white";
        Swipe_toLeft_Node.style.textAlign = "center";

        var Swipe_toRight_Node = document.createElement("span");
        Swipe_toRight_Node.setAttribute("id", "PhotoSlider_NameSpace_Swipe_toRight_Node");
        Swipe_toRight_Node.setAttribute("class", "ion-arrow-right-b");
        Swipe_toRight_Node.style.zIndex = "110";
        Swipe_toRight_Node.style.fontSize = "40px";
        Swipe_toRight_Node.style.cursor = "pointer";
        Swipe_toRight_Node.style.position = "absolute";
        Swipe_toRight_Node.style.width = "40px";
        Swipe_toRight_Node.style.height = "40px";
        Swipe_toRight_Node.style.top = "0px";
        Swipe_toRight_Node.style.lineHeight = "40px";
        Swipe_toRight_Node.style.right = "0px";
        Swipe_toRight_Node.style.color = "white";
        Swipe_toRight_Node.style.textAlign = "center";

        var MainImg_Node = document.createElement("div");
        MainImg_Node.setAttribute("id", "PhotoSlider_NameSpace_MainImg_Node");
        MainImg_Node.style.zIndex = "100";
        MainImg_Node.style.backgroundColor ="#041326";
        MainImg_Node.style.backgroundImage = "";
        MainImg_Node.style.backgroundSize = "cover";
        MainImg_Node.style.position = "absolute";
        MainImg_Node.style.width = "0px";
        MainImg_Node.style.height = "0px";
        MainImg_Node.style.top = "0px";
        MainImg_Node.style.left = "0px";
        MainImg_Node.style.transition = "all 0.2s";

        //绑定节点  
        document.body.appendChild(Background_Node);

        Background_Node.appendChild(MainImg_Node);
        Background_Node.appendChild(Swipe_toLeft_Node);
        Background_Node.appendChild(Swipe_toRight_Node);
        Background_Node.appendChild(Img_Mask_Node);
        Background_Node.appendChild(ToolBar_Node);

        ToolBar_Node.appendChild(ToolBarContent_rotateLeft_Node);
        ToolBar_Node.appendChild(ToolBarContent_rotateRight_Node);

        ToolBar_Node.appendChild(ToolBarContent_ZoomOut_Node);
        ToolBar_Node.appendChild(ToolBarContent_ZoomIn_Node);
        ToolBar_Node.appendChild(ToolBarContent_Recover_Node);

        ToolBar_Node.appendChild(ToolBarContent_exit_Node);

        Background_Node.appendChild(nextImg_Node);
        Background_Node.appendChild(preImg_Node);

        ToolBar_Node.appendChild(ToolBarContent_index_Node);

        photoslider.bindButton();
        photoslider.LoadImg();
        photoslider.initTheLocation();
        photoslider.checksideIndex();

        photoslider.initRotatePool();
    };

    $(window).resize(function () {
        if (photoslider.ifPhotosliderWork == 1) {
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

    photoslider.initTheLocation = function (ifA) {
        if (ifA != 1) {
            $("#PhotoSlider_NameSpace_BackGroundNode").css("transition", "all 0s");
            $("#PhotoSlider_NameSpace_MainImg_Node").css("transition", "all 0s");
        }
        var WinHeight = $(window).height();
        var WinWidth = $(window).width();
        //   if(photoslider.testRotateifHorizontal()==0){
        var ImgWidth = imgSrcPool[photoslider.Index].width;
        var ImgHeight = imgSrcPool[photoslider.Index].height;
        
        var cate_select_width = $("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").width();
        var mutip = imgSrcPool[photoslider.Index].width / imgSrcPool[photoslider.Index].height;
        //重设背景大小

        $("#PhotoSlider_NameSpace_BackGroundNode").height(WinHeight);
        $("#PhotoSlider_NameSpace_BackGroundNode").width(WinWidth);

        //设置蒙版
        $("#PhotoSlider_NameSpace_Img_Mask_Node").height(WinHeight);
        $("#PhotoSlider_NameSpace_Img_Mask_Node").width(WinWidth);

        //重设向左向右按钮位置
        $("#PhotoSlider_NameSpace_Swipe_toLeft_Node").css("top", WinHeight / 2 - 20);
        $("#PhotoSlider_NameSpace_Swipe_toRight_Node").css("top", WinHeight / 2 - 20);
        //重设工具栏宽度
        $("#PhotoSlider_NameSpace_ToolBar_Node").width(WinWidth);
        //重设类别选择框位置

        $("#PhotoSlider_NameSpace_ToolBarContent_category_Select_Node").css("left", WinWidth / 2 - cate_select_width / 2);
        $("#PhotoSlider_NameSpace_BackGroundNode").css("transition", "all 0.4s");
        $("#PhotoSlider_NameSpace_MainImg_Node").css("transition", "all 0.2s");

        //重设IMG大小和位置
        if(ImgWidth && ImgHeight){
            if (ImgWidth >= WinWidth || ImgHeight >= WinHeight) {
                if (ImgWidth >= WinWidth && ImgHeight < WinHeight) {
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("width", WinWidth);
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("height", WinWidth / mutip);
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("left", 0);
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("top", WinHeight / 2 - WinWidth / mutip / 2);
                } else if (ImgWidth < WinWidth && ImgHeight >= WinHeight) {
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("height", WinHeight);
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("width", WinHeight * mutip);
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("top", 0);
                    $("#PhotoSlider_NameSpace_MainImg_Node").css("left", WinWidth / 2 - WinHeight * mutip / 2);
                } else {
                    //长和宽都大于屏幕
                    if (WinWidth / mutip >= WinHeight) {
                        $("#PhotoSlider_NameSpace_MainImg_Node").css("height", WinHeight);
                        $("#PhotoSlider_NameSpace_MainImg_Node").css("width", WinHeight * mutip);
                        $("#PhotoSlider_NameSpace_MainImg_Node").css("top", 0);
                        $("#PhotoSlider_NameSpace_MainImg_Node").css("left", WinWidth / 2 - WinHeight * mutip / 2);
                    } else {
                        $("#PhotoSlider_NameSpace_MainImg_Node").css("width", WinWidth);
                        $("#PhotoSlider_NameSpace_MainImg_Node").css("height", WinWidth / mutip);
                        $("#PhotoSlider_NameSpace_MainImg_Node").css("left", 0);
                        $("#PhotoSlider_NameSpace_MainImg_Node").css("top", WinHeight / 2 - WinWidth / mutip / 2);
                    }
                }
            } else {

                $("#PhotoSlider_NameSpace_MainImg_Node").css("width", ImgWidth);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("height", ImgHeight);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("left", WinWidth / 2 - ImgWidth / 2);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("top", WinHeight / 2 - ImgHeight / 2);
            }
        }else{  
                $("#PhotoSlider_NameSpace_MainImg_Node").css("width", WinWidth * 0.7);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("height", WinHeight * 0.7);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("left", WinWidth / 2 - (WinWidth * 0.7) / 2);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("top", WinHeight / 2 - (WinHeight * 0.7) / 2);
        }
        //设置前后container的位置和大小
        $("#PhotoSlider_NameSpace_nextImg_Node").css("transition", "0s");
        $("#PhotoSlider_NameSpace_preImg_Node").css("transition", "0s");
    };

    photoslider.predoswipe = function (leftright) {

        photoslider.checksideIndex();
        var i = leftright;
        var a = imgSrcPool[photoslider.Index].width;
        var b = imgSrcPool[photoslider.Index].height;

        if (i == 0) {
            photoslider.phototoLeft(photoslider.Index);
        } else if (i == 1) {
            photoslider.phototoRight(photoslider.Index);
        }
        photoslider.LoadSImgCache();
        photoslider.PhotoSizeRecover(a, b, 1);
    };

    photoslider.bindButton = function () {

        $('#PhotoSlider_NameSpace_ToolBarContent_exit_Node').click(function () {
            $("#PhotoSlider_NameSpace_BackGroundNode").remove();
            photoslider.ifPhotosliderWork = 0;

            $('body').attr("style", "");
            $("#photosliderfixer").height("100%");
            $("html").scrollTop(photoslider.scrollcache);
        });
        $("#PhotoSlider_NameSpace_ToolBarContent_ZoomIn_Node").click(function () {
            PhotosliderZoomIn(0);
        });
        $("#PhotoSlider_NameSpace_ToolBarContent_ZoomOut_Node").click(function () {
            PhotosliderZoomOut(0);
        });
        $("#PhotoSlider_NameSpace_ToolBarContent_rotateLeft_Node").click(function () {
            PhotoRotateLeft();
        });
        $("#PhotoSlider_NameSpace_ToolBarContent_rotateRight_Node").click(function () {
            PhotoRotateRight();
        });

        $("#PhotoSlider_NameSpace_ToolBarContent_Recover_Node").click(function () {
            var a = imgSrcPool[photoslider.Index].width;
            var b = imgSrcPool[photoslider.Index].height;
            photoslider.PhotoSizeRecover(a, b, 1);
        });

        $("#PhotoSlider_NameSpace_ToolBarContent_OpenCloseSlider_Node").click(function () {
            OpenClosePhotoSlider();
        });

        $("#PhotoSlider_NameSpace_Swipe_toLeft_Node").click(function () {
            var d = imgSrcPool.length;
            if (photoslider.Index == 0) {
                photoslider.Index = d - 1;
            } else {
                photoslider.Index--;
            }
            photoslider.predoswipe(0);
        });

        $("#PhotoSlider_NameSpace_Swipe_toRight_Node").click(function () {
            var d = imgSrcPool.length;
            if (photoslider.Index == d - 1) {
                photoslider.Index = 0;
            } else {
                photoslider.Index++;
            }
            photoslider.predoswipe(1);
        });
    };

    photoslider.checksideIndex = function () {
        var main = photoslider.Index;
        var long = photoslider.PhotoArrayL;
        if (main == long - 1) {
            photoslider.IndexNext = 0;
            photoslider.IndexPre = photoslider.Index - 1;
        } else if (main == 0) {
            photoslider.IndexPre = long - 1;
            photoslider.IndexNext = photoslider.Index + 1;
        }
    };

    photoslider.testRotateifHorizontal = function () {
        var a = photoslider.rotatePool[photoslider.Index].rotate;
        if (a / 90 % 2 == 0) {
            return 0;
        } else if (a / 90 % 2 != 0) {
            return 1;
        }
    };

    photoslider.initRotatePool = function () {
        photoslider.rotatePool = [];
        var long = photoslider.PhotoArray.length;
        for (var i = 0; i < long; i++) {
            photoslider.rotatePool[i] = {};
            photoslider.rotatePool[i].rotate = 0;
        }
    };

    photoslider.grabImg = function () {
        if (photoslider.mousedown_Lock == 1) {

            var WinWidth = $(window).width();
            var WinHeight = $(window).height();

            //  if(ImgWidth > WinWidth || ImgHeight > WinHeight){
            var toX = photoslider.mouseX_c;
            var toY = photoslider.mouseY_c;
            var disX = photoslider.mouseX - toX;
            var disY = photoslider.mouseY - toY;
            var imgX = $("#PhotoSlider_NameSpace_MainImg_Node").offset().left;
            var imgY = $("#PhotoSlider_NameSpace_MainImg_Node").offset().top;

            if (photoslider.testRotateifHorizontal() == 0) {
                var ImgHeight = $("#PhotoSlider_NameSpace_MainImg_Node").height();
                var ImgWidth = $("#PhotoSlider_NameSpace_MainImg_Node").width();
            } else if (photoslider.testRotateifHorizontal() == 1) {
                var ImgHeight = $("#PhotoSlider_NameSpace_MainImg_Node").width();
                var ImgWidth = $("#PhotoSlider_NameSpace_MainImg_Node").height();
                var rotateFixer = (ImgHeight - ImgWidth) / 2;
            }

            if (photoslider.testRotateifHorizontal() == 0) {
                $("#PhotoSlider_NameSpace_MainImg_Node").css("left", toX - photoslider.RelativeX);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("top", toY - photoslider.RelativeY);
            } else if (photoslider.testRotateifHorizontal() == 1) {
                $("#PhotoSlider_NameSpace_MainImg_Node").css("left", toX - photoslider.RelativeX - rotateFixer);
                $("#PhotoSlider_NameSpace_MainImg_Node").css("top", toY - photoslider.RelativeY + rotateFixer);
            }

            // 图片拖动切换功能区
            var Win1_3_X = 0.33 * WinWidth;
            var Win2_3_X = 0.66 * WinWidth;
            var RightXmove = imgX - Win2_3_X;
            var LeftXmove = Win1_3_X - (imgX + ImgWidth);
            if (imgX > Win2_3_X) {

                $("#PhotoSlider_NameSpace_preImg_Node").css("transition", "0s");
                $("#PhotoSlider_NameSpace_preImg_Node").css("left", -$("#PhotoSlider_NameSpace_preImg_Node").width() + RightXmove);

                photoslider.prenextPool[0] = 1;
            } else if (imgX + ImgWidth < Win1_3_X) {

                $("#PhotoSlider_NameSpace_nextImg_Node").css("transition", "0s");
                $("#PhotoSlider_NameSpace_nextImg_Node").css("left", $(window).width() - LeftXmove);
                photoslider.prenextPool[1] = 1;
            } else {
                photoslider.prenextPool[0] = 0;
                photoslider.prenextPool[1] = 0;
                $("#PhotoSlider_NameSpace_preImg_Node").css("left", -$("#PhotoSlider_NameSpace_preImg_Node").width());
                $("#PhotoSlider_NameSpace_nextImg_Node").css("left", $(window).width());
            }
        }
    };
    var PhotosliderZoomIn = function PhotosliderZoomIn(freq) {
        var WinHeight = $(window).height();
        var WinWidth = $(window).width();
        var ImgWidth = $("#PhotoSlider_NameSpace_MainImg_Node").width();
        var ImgHeight = $("#PhotoSlider_NameSpace_MainImg_Node").height();
        var times = 0;
        if (freq == 0) {
            times = 1.3;
        } else {
            times = 1.4;
        }

        var ImgTop = $("#PhotoSlider_NameSpace_MainImg_Node").offset().top;
        var ImgLeft = $("#PhotoSlider_NameSpace_MainImg_Node").offset().left;
        var ImgWidthAfter = ImgWidth * times;
        var ImgHeighAfter = ImgHeight * times;
        if (ImgWidthAfter < WinWidth * 2.4) {
            $("#PhotoSlider_NameSpace_MainImg_Node").css("width", ImgWidthAfter);
            $("#PhotoSlider_NameSpace_MainImg_Node").css("height", ImgHeighAfter);

            $("#PhotoSlider_NameSpace_MainImg_Node").css("left", WinWidth / 2 - ImgWidthAfter / 2);
            $("#PhotoSlider_NameSpace_MainImg_Node").css("top", WinHeight / 2 - ImgHeighAfter / 2);
        }
    };

    var PhotosliderZoomOut = function PhotosliderZoomOut(freq) {
        var WinHeight = $(window).height();
        var WinWidth = $(window).width();
        var ImgWidth = $("#PhotoSlider_NameSpace_MainImg_Node").width();
        var ImgHeight = $("#PhotoSlider_NameSpace_MainImg_Node").height();
        var times = 0;
        var multip = imgSrcPool[photoslider.Index].width / imgSrcPool[photoslider.Index].height;
        if (freq == 0) {
            times = 0.7;
        } else {
            times = 0.6;
        }

        var ImgTop = $("#PhotoSlider_NameSpace_MainImg_Node").offset().top;
        var ImgLeft = $("#PhotoSlider_NameSpace_MainImg_Node").offset().left;
        var ImgWidthAfter = ImgWidth * times;
        var ImgHeighAfter = ImgHeight * times;
        if (ImgWidthAfter > 50) {
            $("#PhotoSlider_NameSpace_MainImg_Node").css("width", ImgWidthAfter);
            $("#PhotoSlider_NameSpace_MainImg_Node").css("height", ImgHeighAfter);
            $("#PhotoSlider_NameSpace_MainImg_Node").css("left", WinWidth / 2 - ImgWidthAfter / 2);
            $("#PhotoSlider_NameSpace_MainImg_Node").css("top", WinHeight / 2 - ImgHeighAfter / 2);
        } else {
            $("#PhotoSlider_NameSpace_MainImg_Node").css("width", 50);
            $("#PhotoSlider_NameSpace_MainImg_Node").css("height", 50 / multip);
            $("#PhotoSlider_NameSpace_MainImg_Node").css("left", WinWidth / 2 - 50 / 2);
            $("#PhotoSlider_NameSpace_MainImg_Node").css("top", WinHeight / 2 - 50 / multip / 2);
        };
    };

    var PhotoRotateLeft = function PhotoRotateLeft() {
        var a = photoslider.rotatePool[photoslider.Index].rotate - 90;
        $("#PhotoSlider_NameSpace_MainImg_Node").css("transform", "rotate(" + a + "deg)");
        photoslider.rotatePool[photoslider.Index].rotate = a;
        photoslider.initTheLocation(1);
    };

    var PhotoRotateRight = function PhotoRotateRight() {
        var a = photoslider.rotatePool[photoslider.Index].rotate + 90;
        $("#PhotoSlider_NameSpace_MainImg_Node").css("transform", "rotate(" + a + "deg)");
        photoslider.rotatePool[photoslider.Index].rotate = a;
        photoslider.initTheLocation(1);
    };

    photoslider.PhotoSizeRecover = function () {
        photoslider.initTheLocation(1);
    };

    photoslider.phototoLeft = function () {
        photoslider.LoadImg();

        photoslider.loadtheRotate(0);
    };
    photoslider.phototoRight = function () {
        photoslider.LoadImg();

        photoslider.loadtheRotate(0);
    };

    photoslider.loadtheRotate = function (ifA) {
        if (ifA == 0) {
            $("#PhotoSlider_NameSpace_MainImg_Node").css("transition", "all 0s");
        }

        var a = photoslider.rotatePool[photoslider.Index].rotate;

        if (a != null && a != "") {
            $("#PhotoSlider_NameSpace_MainImg_Node").css("transform", "rotate(" + a + "deg)");
        } else {
            $("#PhotoSlider_NameSpace_MainImg_Node").css("transform", "rotate(0deg)");
        }
    };

    photoslider.LoadImg = function () {
        var WinHeight = $(window).height();
        var WinWidth = $(window).width();
        var BgHeight = $("#PhotoSlider_NameSpace_BackGroundNode").height();
        var CateWidth = $("#PhotoSlider_NameSpace_ToolBarContent_category_Node").width();
        var ImgWidth = imgSrcPool[photoslider.Index].width;
        var ImgHeight = imgSrcPool[photoslider.Index].height;

        $("#PhotoSlider_NameSpace_BackGroundNode").height(WinHeight);
        $("#PhotoSlider_NameSpace_BackGroundNode").width(WinWidth);
        $("#PhotoSlider_NameSpace_ToolBar_Node").width(WinWidth);
        $("#PhotoSlider_NameSpace_ToolBarContent_category_Node").css("right", WinWidth / 2 - CateWidth / 2);

        $("#PhotoSlider_NameSpace_ToolBarContent_index_Node").html(photoslider.Index + 1 + "/" + imgSrcPool.length);

        $("#PhotoSlider_NameSpace_Swipe_toLeft_Node").css("top", WinHeight / 2 - 20);
        $("#PhotoSlider_NameSpace_Swipe_toRight_Node").css("top", WinHeight / 2 - 20);
        $("#PhotoSlider_NameSpace_BackGroundNode").show();

        $("#PhotoSlider_NameSpace_BackGroundNode").css("opacity", "1");
        $("#PhotoSlider_NameSpace_ToolBar_Node").show();
        $("#PhotoSlider_NameSpace_MainImg_Node").css("backgroundImage", "url(" + imgSrcPool[photoslider.Index].src + ")");
    };

    photoslider.scrollFunc_Lock = 0;
    photoslider.ifPhotosliderWork = 0;

    var scrollFunc = function scrollFunc(e) {

        if (photoslider.scrollFunc_Lock == 0 && photoslider.ifPhotosliderWork == 1) {
            e = e || window.event;
            var value = 0;
            if (e.wheelDelta) {
                value = e.wheelDelta / 120;
            } else {
                value = e.detail / -3;
            };
            $("#PhotoSlider_NameSpace_MainImg_Node").css("transition", "all 0.1s");
            photoslider.scrollFunc_Lock = 1;
            setTimeout("photoslider.scrollFunc_Lock = 0", 130);
            if (value > 0) {
                PhotosliderZoomIn(1);
            } else if (value < 0) {
                PhotosliderZoomOut(1);
            };
        }
    };
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    window.onmousewheel = document.onmousewheel = scrollFunc;

    photoslider.refreshSideImg = function () {
        if (photoslider.PhotoArrayL == 1) {
            var preIndex = 0;
            var nextIndex = 0;
        } else {
            if (photoslider.Index == 0) {
                var preIndex = photoslider.PhotoArrayL - 1;
                var nextIndex = 1;
            } else if (photoslider.Index == photoslider.PhotoArrayL - 1) {
                var nextIndex = 0;
                var preIndex = photoslider.Index - 1;
            } else {
                var preIndex = photoslider.Index - 1;
                var nextIndex = photoslider.Index + 1;
            }
        }

        $("#PhotoSlider_NameSpace_preImg_Node").width(imgSrcPool[preIndex].width);
        $("#PhotoSlider_NameSpace_nextImg_Node").width(imgSrcPool[nextIndex].width);
        $("#PhotoSlider_NameSpace_preImg_Node").height(imgSrcPool[preIndex].height);
        $("#PhotoSlider_NameSpace_nextImg_Node").height(imgSrcPool[nextIndex].height);
        $("#PhotoSlider_NameSpace_preImg_Node").css("top", $(window).height() / 2 - $("#PhotoSlider_NameSpace_preImg_Node").height() / 2);
        $("#PhotoSlider_NameSpace_nextImg_Node").css("top", $(window).height() / 2 - $("#PhotoSlider_NameSpace_nextImg_Node").height() / 2);
        $("#PhotoSlider_NameSpace_nextImg_Node").css("left", $(window).width());
        $("#PhotoSlider_NameSpace_preImg_Node").css("left", -$("#PhotoSlider_NameSpace_preImg_Node").width());
        $("#PhotoSlider_NameSpace_preImg_Node").css("backgroundImage", "url(" + imgSrcPool[preIndex].src + ")");
        $("#PhotoSlider_NameSpace_nextImg_Node").css("backgroundImage", "url(" + imgSrcPool[nextIndex].src + ")");
    };

    var instance = [];

    var ImgSizeScanner = function () {
        function ImgSizeScanner(filename, index) {
            _classCallCheck(this, ImgSizeScanner);

            this.filename = filename;
            this.testTimer = null;
            this.index = index;
            this.init = null;
            instance[index] = this;
        }

        ImgSizeScanner.prototype.createImg = function createImg() {
            this.init = 1;
            var img = new Image();
            img.src = this.filename;
            this.img = img;
            img.onload =function(){  
                if(this.index==photoslider.Index){
                    photoslider.initTheLocation(1);
                }
            }  
            if (img.complete) {
                var list = [this.img.width, this.img.height];
                imgSrcPool[this.index].width = list[0];
                imgSrcPool[this.index].height = list[1];
                imgSrcPool[this.index].sizeFlag = true;
            }
            var _index = this.index;
            this.testTimer = setInterval(function () {
              
                instance[_index].getImgSize();
            }, 20);
        };

        ImgSizeScanner.prototype.getImgSize = function getImgSize() {
            if (this.img.width * this.img.height != 0) {
                clearInterval(instance[this.index].testTimer);
                
                this.testTimer = null;
                var list = [this.img.width, this.img.height];
                imgSrcPool[this.index].width = list[0];
                imgSrcPool[this.index].height = list[1];
                imgSrcPool[this.index].sizeFlag = true;
                if(this.index == photoslider.Index){
                    photoslider.MainImgReady = 1;
                    photoslider.LoadMImgCache();
                }
            
            }
        };

        return ImgSizeScanner;
    }();

    photoslider.checkSizeReady = function (List) {
        var list = List;
        var checkSizeReady_Timer = setInterval(function () {
        
            var count = 0;
            for (var i = 0; i < list.length; i++) {
                if (imgSrcPool[list[i]].sizeFlag == false) {
                    count = 1;
                }
            }
            if (count == 0) {
                clearInterval(checkSizeReady_Timer);
                photoslider.alLocation();
            }
        }, 30);
    };
})();
