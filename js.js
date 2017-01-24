/*��װ$*/
window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:
        elems.length==1?elems[0]:
            elems;
}
/*���ͼƬ����*/
var imgs2=[
    {"i":0,"img":"index/bg1.jpg"},
    {"i":1,"img":"index/bg2.jpg"},
    {"i":2,"img":"index/bg3.jpg"},
];
var slider2={
    LIWIDTH:0,//����ÿ��li�Ŀ��

    DURATION:1000,//ÿ���ֲ�����ʱ��
    DISTANCE:0,//ÿ���ֲ����ܾ���
    STEPS:200,//ÿ���ֲ����ܲ���
    interval:0,//�ֲ�ÿһ����ʱ����
    step:0,//�ֲ�ÿһ���Ĳ���
    moved:0,//�����ֲ��Ѿ��ƶ��Ĳ���
    timer:null,//���浱ǰ���������
    WAIT:3000,//�����Զ��ֲ�֮��ĵȴ�ʱ��
    canAuto:true,//���浱ǰ�ܷ������Զ��ֲ�

    init:function(){//��ʼ������ֲ�
        //���idΪslider��Ԫ�ؼ�������ʽ�Ŀ�������LIWIDTH
        this.LIWIDTH=parseFloat(
            getComputedStyle($("#xlbk")).width
        );
        this.updateView();

        var me=this;//��סthis��
        //����interval: DURATION/STEPS
        this.interval=this.DURATION/this.STEPS;
        //ΪidΪidxs��ul���������¼���function(e){
        $("#indexs2").addEventListener("mouseover",function(e){
            //���Ŀ��Ԫ����li��Ŀ��Ԫ�ص�class����hover
            if(e.target.nodeName=="LI"&&e.target.className!="hover"){
                //�����ƶ�����n: Ŀ��Ԫ�ص�����-idxs��classΪhover��Ԫ�ص�����
                var n=e.target.innerHTML-$("#indexs2>.hover").innerHTML;
                //����move������n��Ϊ����
                me.move(n);
            }
        });
        //ΪidΪslider��div���������¼�function(){
        $("#xlbk").addEventListener("mouseover",function(){
            me.canAuto=false;//�޸�canAuto����Ϊfalse
        })
        //ΪidΪslider��div������Ƴ��¼�function(){
        $("#xlbk").addEventListener("mouseout",function(){
            me.canAuto=true;//�޸�canAuto����Ϊtrue
        });
        this.autoMove();//�����Զ��ֲ�
    },
    autoMove:function(){//�����Զ��ֲ�
        var me=this;
        //����һ���Զ�ʱ��
        this.timer=setTimeout(function(){
            if(me.canAuto){//���canAutoΪtrue
                me.move(1);//����move,�������1
            }else{//����
                me.autoMove();//�ٴε���autoMove
            }
        },this.WAIT);
    },
    move:function(n){//����һ���ֲ���n��ʾҪ�ƶ���li����
        if(this.timer!=null){//���timer������null
            clearTimeout(this.timer);//ֹͣһ���Զ�ʱ��timer
            this.timer=null;
            $("#xlb").style.left="";//���idΪimgs��left����
        }

        //����DISTANCE: LIWIDTH*n
        this.DISTANCE=this.LIWIDTH*n;
        //����step: DISTANCE/STEPS
        this.step=this.DISTANCE/this.STEPS;
        if(n<0){//���n<0
            //ɾ��imgs��β��-n��Ԫ�أ���imgsʣ��Ԫ��ƴ�ӵ�imgsɾ��Ԫ�صĽ�β����������imgs��
            imgs2=imgs2.splice(imgs2.length-(-n),-n).concat(imgs2);
            //����idΪimgs��ul��leftΪDISTANCE
            $("#xlb").style.left=this.DISTANCE+"px";
            this.updateView();//����ҳ��
        }
        //����һ���Զ�ʱ��������moveStep����������ʱ��Ϊinterval������ű�����timer��
        this.timer=setTimeout(
            this.moveStep.bind(this,n),this.interval);
    },
    moveStep:function(n){//�ƶ�ÿһ��
        //���idΪimgs��ul��������ʽ��left
        var l=parseFloat(getComputedStyle($("#xlb")).left);
        //����idΪimgs��ul��leftΪleft-step
        $("#xlb").style.left=l-this.step+"px";
        this.moved++;//moved+1
        if(this.moved<this.STEPS){//���moved<STEPS
            //����һ���Զ�ʱ��������moveStep����������ʱ��Ϊinterval������ű�����timer��
            this.timer=setTimeout(
                this.moveStep.bind(this,n),this.interval);
        }else{//�����ֲ�����
            if(n>0){//���n>0
                //ɾ��imgs��ͷ��n��Ԫ�أ��ٽ�ɾ����Ԫ��ƴ�ӵ�imgs��β����������imgs��
                imgs2=imgs2.concat(imgs2.splice(0,n));
                this.updateView();//����ҳ��
            }
            $("#xlb").style.left="";//���idΪimgs��ul��left
            this.timer=null;//timer��Ϊnull
            this.moved=0;//moved��0
            //ÿ���ֲ����������ٴε���autoMove�����Զ��ֲ�:
            this.autoMove();
        }
    },
    updateView:function(){//ר�Ÿ�����������ݣ����½���
        //����idΪimgs��ul�Ŀ�ΪLIWIDTH*imgs��Ԫ�ظ���
        $("#xlb").style.width=this.LIWIDTH*imgs2.length+"px";
        //����imgs������ÿ��ͼƬ����,ͬʱ�������ַ���lis��idxs
        for(var i=0,lis="",idxs="";i<imgs2.length;i++){
            //��lis��ƴ��:
            lis+='<li><img src="'+imgs2[i].img+'"></li>';
            //��idxs��ƴ��:"<li>i+1</li>"
            idxs+="<li>"+(i+1)+"</li>";
        }//(��������)
        //����idΪimgs��Ԫ�ص�����Ϊlis
        $("#xlb").innerHTML=lis;
        //����idΪidxs��Ԫ�ص�����Ϊidxs
        $("#indexs2").innerHTML=idxs;
        //�ҵ�idΪidxs�µ�����li�к�imgs�е�0��Ԫ�ص�i������ͬλ�õ�Ԫ�أ�������classΪhover
        $("#indexs2>li")[imgs2[0].i].className="hover";
    }
}
window.addEventListener("load",function(){slider2.init();})
