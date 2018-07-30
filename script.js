$(function(){

    var flag=0;
    var pointer=0;//for pointer=1, for draw=0
    var move;//Is it clicked or is it on the move
    var x1;//mousedown
    var y1;//mousedown
    var x2;//mouseup
    var y2;//mouseup
    var cx1;//for path x1
    var cy1;//for path y1
    var cx2;//for path x2
    var cy2;//for path y2
    var diffx;//difference of x-axis
    var diffy;//difference of y-axis

    var svg = Pablo('#client').svg({ //create svg with height and width
        width: 1100,
        height: 500
    });

    $('#line').click(function(){ //when id=line button clicked
        flag=1;//set flag line
    });

    $('#circle').click(function(){ //when id=circle button clicked
        flag=2;//set flag circle
    });
    $('#rectangle').click(function(){//when id=rectangle button clicked
        flag=3;//set flag rectangele
    });
    $('#path').click(function(){//when id=path button clicked
        flag=4;//set flag path
    });
    $('#pointer').click(function(){

        if($('#pointer').text()=='Pointer'){//If the button  text is pointer
            pointer=1;//set pointer=1
            move=1;//set move=1
            $('#pointer').text('Draw');//set button text draw
        }
        else{
            if($('#pointer').text()=='Draw'){//If the button  text is draw
                pointer=0;//set pointer=0
                move=1;//set move=1
                $('#pointer').text('Pointer');//set button text pointer
            }
        }

    });


    $('#client').mousedown(function(event){//when mouse down
        x1=event.clientX-406;//shear rate 406px--x coordinate
        y1=event.clientY-200;//shear rate 200px--y coordinate
        cx1=x1-100;
        cy1=y1-100;

    });

    $('#client').mouseup(function(event){//when mouse up
        x2=event.clientX-406;//shear rate 406px--x coordinate
        y2=event.clientY-200;//shear rate 200px--y coordinate
        cx2=x2-50;
        cy2=y2-50;

        if(flag==1&&pointer==0){

           svg.line({x1:x1,x2:x2,y1:y1,y2:y2,stroke:'green'}).on('click mousemove', function(event){// click and mousemove event
            if(pointer==1&&move==1){
                diffx=x1-x2;
                diffy=y1-y2;
                if(event.type=="mousemove"){//Move object if pointer is clicked

                    //change the starting and end points of the clicked object.
                    x1=event.clientX-406;
                    y1=event.clientY-200;
                    x2=x1-diffx;
                    y2=y1-diffy;
                    Pablo(this).attr('x1', x1);
                    Pablo(this).attr('y1', y1);
                    Pablo(this).attr('x2', x2);
                    Pablo(this).attr('y2', y2);
                }
                if(event.type=="click"){
                    move=0;//stop object
                }
            }else{
                if(event.type=="click"){
                    if(pointer==1&&move==0){
                        move=1;//move if drawing is not done
                    }
                }
            }
           });

        }

        if(flag==2&&pointer==0){

          svg.circle({cx:x2, cy:y2, r:50, fill:'#ca973b'}).on('click mousemove', function(event){// click and mousemove event

            if(pointer==1&&move==1){

                if(event.type=="mousemove"){//Move object if pointer is clicked

                    //change the center points of the clicked object.
                    x2=event.clientX-406;
                    y2=event.clientY-200;
                    Pablo(this).attr('cx', x2);
                    Pablo(this).attr('cy', y2);
                }
                if(event.type=="click"){
                    move=0;//stop object
                }
            }else{
                if(event.type=="click"){
                    if(pointer==1&&move==0){
                        move=1;//move if drawing is not done
                    }
                }
            }

        });

        }


        if(flag==3&&pointer==0){

            svg.rect({width:200, height:100,x:x2,y:y2,fill:'#7c1814'}).on('click mousemove', function(event){// click and mousemove event

                if(pointer==1&&move==1){

                    if(event.type=="mousemove"){//Move object if pointer is clicked

                        //change the starting points of the clicked object.
                        x2=event.clientX-406;
                        y2=event.clientY-200;
                        Pablo(this).attr('x', x2-10);
                        Pablo(this).attr('y', y2-10);
                    }
                    if(event.type=="click"){
                        move=0;//stop object
                    }
                }else{
                    if(event.type=="click"){
                        if(pointer==1&&move==0){
                            move=1;//move if drawing is not done
                        }

                    }
                }

            });

        }
        if(flag==4 && pointer==0){

             svg.path({
                d: 'M '+x2+' '+y2+' C '+cx2+' '+cy2+', '+cx1+' '+cy1+', '+x1+' '+y1+'',
                fill:  'none',
                stroke:'#3c287c',
                'stroke-width': 2,
                'stroke-linecap': 'round'
             });

        }

    });

});
