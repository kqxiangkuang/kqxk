/*��װ$*/
window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems==null?null:
	   elems.length==1?elems[0]:
		               elems;
}
/*���ͼƬ����*/
var imgs=[
    {"i":0,"img":"index/banner_01.jpg"},
    {"i":1,"img":"index/banner_02.jpg"},
    {"i":2,"img":"index/banner_03.jpg"},
    {"i":3,"img":"index/banner_04.jpg"},
    {"i":4,"img":"index/banner_05.jpg"},
];
var adv={
	LIWIDTH:850,//ÿ�����ͼƬ�Ŀ��
	DURATION:500,//������ʱ��
	WAIT:3000,//�Զ��ֲ�֮��ȴ���ʱ��
	STEPS:150,//�����ƶ����ܲ���
	timer:null,//���浱ǰ���ڲ��ŵĶ�ʱ�����
	canAuto:true,//�����Ƿ�����Զ��ֲ�

	init:function(){
		var self=this;
		self.updateView();
		
		//���������������ʱ�����û������Զ��ֲ�
		$("#slider").addEventListener("mouseover",function(){
			self.canAuto=false;
		},false);
		$("#slider").addEventListener("mouseout",function(){
			self.canAuto=true;
		},false);

		self.automove();//��ʼ��ʱ���������Զ��ֲ�

		//�ҵ�idΪindexs��ul�����������¼�
		$("#indexs").addEventListener("mouseover",function(){
		//	���Ŀ��Ԫ��target
			var e=window.event||arguments[0];
			var target=e.srcElement||e.target;
		//	���target��LI����target.innerHTML-1������imgs�����е�һ��Ԫ�ص�i����
			if(target.nodeName=="LI"
				&&target.innerHTML-1!=imgs[0].i){
		//		��ȡidΪindexs��classΪhover��li���������ʽ��
				$("#indexs>.hover").className="";
		//		��target��className����Ϊ"hover"
				target.className="hover";
		//		�����ƶ�����target������-1-imgs�����е�һ��Ԫ�ص�i���ԣ������ڱ���n��
				var n=target.innerHTML-1-imgs[0].i;
		//		����move���������ֶ��ƶ�������n
				self.move(n);
			}
		},false);
	},
	//�ƶ������li�ķ��������ֶ��ֲ�
	move:function(n){//n��ʾҪ�ƶ���li����������Ϊ��
		//ֹͣ��ǰ�������е�timer��������timer����Ϊnull
		clearTimeout(this.timer);

		this.timer=null;
		if(n<0){//�������
		//	��imgs�����β��-n��Ԫ��ɾ����ƴ�ӵ�imgs���鿪ͷ���ٱ����imgs��
			imgs=imgs.splice(imgs.length+n,-n).concat(imgs);
		//	����updateView����ˢ�½���
			this.updateView();
		//	����idΪimgs��ul��leftΪn*LIWIDTH
			$("#imgs").style.left=n*this.LIWIDTH+"px";
		}

		this.moveStep(n);//����moveStep����������n
	},
	//���ƶ�ǰ�󣬽�imgs���������ˢ�µ�ҳ��
	updateView:function(){
		$("#imgs").style.width=//����ul���ܿ��
			this.LIWIDTH*imgs.length+"px";

		//����imgs��ÿ��img����,ͬʱ����lis��idxs������
		for(var i=0,lis=[],idxs=[];i<imgs.length;i++){
		//	��lis�е�ǰλ�������Ԫ�أ�<li data-i="��ǰ�����i"><img src="��ǰ�����img"></li>
			lis[i]="<li data-i='"+imgs[i].i
					+"'><img src='"+imgs[i].img+"'></li>"
		//	��idxs�е�ǰλ�������Ԫ��:<li>i+1</li>
			idxs[i]="<li>"+(i+1)+"</li>";
		}//(����������)
		//����idΪimgs��ul������Ϊlis�޷�ƴ�Ӻ�Ľ��
		$("#imgs").innerHTML=lis.join("");
		//����idΪindexs��ul������Ϊidxs�޷�ƴ�Ӻ�Ľ��
		$("#indexs").innerHTML=idxs.join("");

		//�ҵ�#indexs�µ�classΪhover��li�����class
		$("#indexs>.hover").className="";
		//�ҵ�#indexs������li���±��imgs�����е�һ�������i������ͬ��li������classΪhover
		$("#indexs>li")[imgs[0].i].className="hover";
	},
	automove:function(){
		var self=this;//��סthis
		//����һ���Զ�ʱ������������������װ��moveStep�������ã���moveStep������д������1������ʱ����ΪWAIT
		self.timer=setTimeout(function(){
			if(self.canAuto){//����������Զ��ֲ�
				self.moveStep(1);//���ƶ�һ��
			}else{//����������Զ��ֲ�
				self.automove();//�ͷ����ȴ�
			}
		},self.WAIT);
	},
	//��ul�ƶ�һ��
	moveStep:function(n){//n��ʾҪ�ƶ���li����������Ϊ��
		var self=this;//��סthis
		//���㲽����LIWIDTH*n/STEPS�������ڱ���step��
		var step=self.LIWIDTH*n/self.STEPS;
		//���idΪimgs��ul��������ʽ�������ڱ���style��
		var style=getComputedStyle($("#imgs"));
		//������leftֵ:style��left-step�������ڱ���left��
		var left=parseFloat(style.left)-step;
		//����leftֵ���õ�idΪimgs��ulԪ�ص�left������
		$("#imgs").style.left=left+"px";
		//���n>0����leftֵ>-LIWIDTH*n��n<0����leftֵ<0
		if(n>0&&left>-self.LIWIDTH*n||n<0&&left<0){
		//	������һ�ζ�ʱ������������������װmoveStep�������ã�ͬʱ����DURATION/STEPS��Ϊʱ����
			self.timer=setTimeout(function(){
				self.moveStep(n);
			},self.DURATION/self.STEPS);
		}else{//����˵���ƶ���ɣ�
		//	��idΪimgs��ul��left��������Ϊ0px
			$("#imgs").style.left="0px";
		//  �ٴε���automove�����������Զ��ֲ�
			self.automove();
			if(n>0){//	���n>0 ��˵�����ƣ�
		//		��0λ�ÿ�ʼɾ��ԭimgs������n��Ԫ�أ�ɾ�����ֱ��ƴ�ӵ�imgs�ϣ��ٱ����imgs������
				imgs=imgs.concat(imgs.splice(0,n));
		//		����updateView���������½���
				self.updateView();
			}
		}
	}
}

window.onload=function(){
	adv.init();
}
$("#icon_list").onmouseover=function(e){
	e=window.event||e;
	var onclick=e.srcElement||e.onclick;
	if(onclick.nodeName=="IMG"){
		var path=onclick.src;
		var i=path.lastIndexOf(".");
		$("#mImg").src=
			path.slice(0,i)+"-m"+path.slice(i);

	}
};
