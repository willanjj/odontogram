//definicion de variables
var colorSeleccion;        
var posicionyinicial;
var espacionfilasdientes;
var posyinicioarriba;
var posyfinarriba;
var posyinicioabajo;
var posyfinabajo;
var espacioseccion;
var distanciaentregrupos;
var posdientessup;
var posdientesinf;
var canvas;
var layer2;
var layer3;
var layer4;
var context;
var ctx2;
var ctx3;
var ctx4;
//variables de las nuevas capas y contextos
var seleccionDienteCanvas,seleccionDienteCapa,seleccionDienteCtx;
var marcacionCorrectaCanvas,marcacionCorrectaCapa,marcacionCorrectaCtx;
var marcacionTornilloCanvas,marcacionTornilloCapa,marcacionTornilloCtx;
var color_line;
var medida;
var separacion_x;
var separacion_y;
var iniciar_x;
var iniciar_y;//20
//Dientes para el puente        
var diente1;
var diente2;
var figura_elemento_diente1;
var figura_elemento_diente2;
var diente;
var canvas1;
var canvas2;
var canvas3;
var canvas4;
var posix,posfy;

class Odontograma {
	//Instancia de la clase de datos
    //datosDientes =new DatosDientes();       
    constructor(canvas1,canvas2,canvas3,canvas4,seleccionDienteCanvas,marcacionCorrectaCanvas,marcacionTornilloCanvas,accion){    
        this.canvas1=canvas1;
        this.canvas2=canvas2;
        this.canvas3=canvas3;
        this.canvas4=canvas4;            
        this._accion_diente=accion;
        this.marcacionCorrectaCanvas=marcacionCorrectaCanvas;
        this.seleccionDienteCanvas=seleccionDienteCanvas;
        this.marcacionTornilloCanvas=marcacionTornilloCanvas;
    }   
    isEmpty(str) {
        return (!str || 0 === str.length);
    }
    
    //TODO: INICIO DEL PROCESO
    //PASO 1.
    //funcion para cargar los datos
    carga_datos(text){
        this.cargar();//1.1        
        localStorage.clear();        
        this.eventos_mouse();//1.2                
        if(!this.isEmpty(text.trim())){        	        	
            var datos_iniciales = JSON.parse(text);            	        
            for(var estado_diente in datos_iniciales){
                var obj = datos_iniciales[estado_diente]; 	        	 	        	                
                for (var key in obj){                	
                   var attrValue = obj[key];                   
                   var numeroDiente=0;    
                   var new_array=[attrValue['diente'],
                   attrValue['seccion'],
                   attrValue['accion'],
                    new Date(attrValue['fecha']),
                    attrValue['estado']];
                   var datos = new_array.toLocaleString();                   
                   localStorage.setItem(numeroDiente, datos);                                                                                                                  
                   if(attrValue['estado']==this.estadoDientePuente){                        
                        this.pinta_puentes();
                   }else{
                        this.pinta_datos();
                   }                   
                } 	       	          
            }
        }        
    }
    
    //PASO 1.1
    //Dibuja el contorno y las imágenes
    cargar(){         	
    	var num_dientes;
        this.inicar_variables();//1.1.1 
        var dientessuperiores;
        var dientesinferiores;        
        var _es_pediatrico=true;

        if(_es_pediatrico){//condición para dientes pediatricos
        	num_dientes=10;
        	dientessuperiores=[55,54,53,52,51,61,62,63,64,65];
        	dientesinferiores=[85,84,83,82,81,71,72,73,74,75];
        }else{//condición para dientes adultos
        	num_dientes=16;
        	dientessuperiores=[18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
        	dientesinferiores=[48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
        }   
        var separacion_y=10;                     
        for (var  x=0; x<num_dientes; x++){
            iniciar_x =  (x*medida) + (separacion_x*x) + separacion_x;            
            var superior='s';            
            //1.1.4
            //this.dibuja_imagen(context, iniciar_x, iniciar_y, dientessuperiores[x],superior);//1.1.4
            /* Numero de diente */
            context.font = '10pt Calibri';
            context.textAlign = 'center';
            context.fillStyle = 'blue';
            context.fillText(dientessuperiores[x], iniciar_x+(medida/2), (iniciar_y-10)+5);                        
            elementos.push({
                cod: dientessuperiores[x],
                col: 'green',
                ini_x: iniciar_x, 
                ini_y: iniciar_y, 
                med: medida, 
                sep_x: separacion_x, 
                sep_y: separacion_y,
                tip:superior,
                num:x,       
                figura1: new Path2D(),
                figura2: new Path2D(),
                figura3: new Path2D(),
                figura4: new Path2D(),
                figura5: new Path2D(),
                figura6: new Path2D()
            });
        }        
        iniciar_x = 0;
        iniciar_y = medida + 100+espacionfilasdientes;                      
        for (x=0; x<num_dientes; x++){
            iniciar_x =  (x*medida) + (separacion_x*x) + separacion_x;
            //this.dibuja_contorno(context, iniciar_x, iniciar_y, medida, separacion_x, separacion_y);//1.1.3
            var inferior='i';
            //1.1.4                        
            //this.dibuja_imagen(context, iniciar_x, iniciar_y, dientesinferiores[x],inferior);//1.1.4
            /* Numero de diente */
            context.font = '10pt Calibri';
            context.textAlign = 'center';
            context.fillStyle = 'blue';
            context.fillText(dientesinferiores[x], iniciar_x+(medida/2), (iniciar_y-10)+5);
            elementos.push({
                cod: dientesinferiores[x],
                col: 'green',
                ini_x: iniciar_x, 
                ini_y: iniciar_y, 
                med: medida, 
                sep_x: separacion_x, 
                sep_y: separacion_y,
                tip:inferior,
                num:x,
                figura1: new Path2D(),
                figura2: new Path2D(),
                figura3: new Path2D(),
                figura4: new Path2D(),
                figura5: new Path2D(),
                figura6: new Path2D()
            });
        }    
        this.dibuja_contorno_elementos(context);
    }
    //PASO 1.2
    //Establece los metodos
    eventos_mouse(){        
        //Añadimos un addEventListener al canvas para reconocer el click
        layer4.addEventListener("click",
        //Una vez se haya clickado se activará la siguiente función
        this.getPosition.bind(this)//1.2.1
        ,false);
        layer4.addEventListener("mousemove",this.Marcar.bind(this),false);//1.2.2        
    }

    //PASO 1.3
    //Dibuja los datos cargados que tienen que ver con  afectación al diente
    pinta_datos(){
        var array_local = [];
        for(var i=0; i < localStorage.length; i++){
            var key_name = localStorage.key(i);
            array_local[i]=localStorage.getItem(key_name).split(',');
        }
        array_local.sort(function(a,b){
            return a[3] > b[3]; // orden ascendente por las fechas;
        });
        for(var i=0; i < array_local.length; i++){
            var item = array_local[i];
            var estado = item[4];                              
            if(!estado){
            	return;
            }
            var accion,color,seleccion;
            var estado_diente_lista;
            try {
            	estado_diente_lista=JSON.parse(this.obtener_dato_por_nombre(estado));
            	accion = estado_diente_lista['accion'];            
                seleccion=estado_diente_lista['nombre'];
                color = estado_diente_lista['color'];             
			} catch (e) {
            }   
           if(accion){
                for(var i=0;i<elementos.length;i++){                    
                    if(item[0]==elementos[i].cod){
                        switch (accion) {
                            case this.estadoDienteSuperficie:
                                var figuraSeccion=new Path2D();
                                if(parseInt(item[1],10)==1){
                                    figuraSeccion=elementos[i].figura1;
                                }
                                else if(parseInt(item[1],10)==2){
                                    figuraSeccion=elementos[i].figura2;
                                }
                                else if(parseInt(item[1],10)==3){
                                    figuraSeccion=elementos[i].figura3;
                                }
                                else if(parseInt(item[1],10)==4){
                                    figuraSeccion=elementos[i].figura4;
                                }
                                else if(parseInt(item[1],10)==5){
                                    figuraSeccion=elementos[i].figura5;
                                }
                                this.dibuja_seccion(ctx4, figuraSeccion, color);//1.3.2
                            break;
                            case this.estadoDienteExtraccion:
                                this.marcar_extraccion(ctx4, elementos[i].figura6, color,elementos[i].ini_x,elementos[i].ini_y);//1.3.3
                            break;  
                            case this.estadoDienteCorrecto:
                                this.marcar_correcto(ctx4, elementos[i].figura6, color,elementos[i].ini_x,elementos[i].ini_y);
                            break;     
                            case this.estadoDienteImplante:
                                this.marcar_tornillo(ctx4, elementos[i].figura6, color,elementos[i].ini_x,elementos[i].ini_y);
                            break;
                        }                        
                        break;
                    }
                }
            }                       
        }
    }
    //PASO 1.4
    //Metodo para graficar un puente
    pinta_puentes(){       
        var array_local = [];
        for(var i=0; i < localStorage.length; i++){
            var key_name = localStorage.key(i);
            array_local[i]=localStorage.getItem(key_name).split(',');
        }
        array_local.sort(function(a,b){
            return a[3] > b[3]; // orden ascendente por las fechas;
        });
        for(var i=0; i < array_local.length; i++){
            var item = array_local[i];
            var estado = item[4];      
            if(!estado){
            	return;
            }
            var accion,color,seleccion;            
            var estado_diente_lista;
            try {
            	estado_diente_lista=JSON.parse(this.obtener_dato_por_nombre(estado));	
			} catch (e) {
				estado_diente_lista=this.obtener_dato_por_nombre(estado);
			}
            if(estado_diente_lista){
	            accion = estado_diente_lista['accion'];            
	            seleccion=estado_diente_lista['nombre'];
                color = estado_diente_lista['color'];     
                var figura_elemento_actual;                           
	            if (accion==this.estadoDientePuente){    
                    for(var i=0;i<elementos.length;i++){
                        if (parseInt(elementos[i].cod,10)==parseInt(item[0],10)){                         
                            figura_elemento_actual=elementos[i];
                            break;
                        }           
                    }                    
                    diente=parseInt(item[0],10);                                                            
                    if (diente1==0){                                                                                
                        diente1=diente;                        
                        figura_elemento_diente1=figura_elemento_actual;
                        break;
                    }
                    if(diente2==0){
                        diente2=diente;                    
                        figura_elemento_diente2=figura_elemento_actual;
                        if(figura_elemento_diente1.num>figura_elemento_diente2.num){
                            this.marcar_puente(ctx4, figura_elemento_diente2, figura_elemento_diente1);
                        }else{
                            this.marcar_puente(ctx4, figura_elemento_diente1, figura_elemento_diente2);
                        }                        
                        diente1=0;
                        diente2=0;
                        break;
                    }                        	                
	            }
            }                
        }
    }
    
    get getDatosDientes(){
        return this.datosDientes;
    }

    get accion_diente() {
        return this._accion_diente;
    }
    
    set accion_diente(accion) {
        this._accion_diente = accion;
    }
           
    //PASO 1.1.1
    //Inicia las variables
    inicar_variables(){
    	//this.datosDientes._es_pediatrico=true;
        colorSeleccion='red';
        posicionyinicial=100;
        espacionfilasdientes=30;
        posyinicioarriba=95;
        posyfinarriba=146;    
        posyinicioabajo=168;
        posyfinabajo=212;        
        espacioseccion=15;
        distanciaentregrupos=espacionfilasdientes+43;
        posdientessup=105;
        posdientesinf=50;    
        canvas = document.getElementById(this.canvas1);
        context = canvas.getContext('2d');    
        layer2 = document.getElementById(this.canvas2);
        ctx2 = layer2.getContext("2d");    
        layer3 = document.getElementById(this.canvas3);
        ctx3 = layer3.getContext("2d");          
        layer4 = document.getElementById(this.canvas4);
        ctx4 = layer4.getContext("2d");             
        seleccionDienteCapa = document.getElementById(this.seleccionDienteCanvas);
        seleccionDienteCtx= seleccionDienteCapa.getContext("2d");                
        marcacionCorrectaCapa=document.getElementById(this.marcacionCorrectaCanvas);
        marcacionCorrectaCtx= marcacionCorrectaCapa.getContext("2d");
        marcacionTornilloCapa=document.getElementById(this.marcacionTornilloCanvas);
        marcacionTornilloCtx=marcacionTornilloCapa.getContext("2d");        
        color_line = 'blue';
        medida = 40;
        separacion_x = 10;
        separacion_y = 10;
        iniciar_x = 0;
        iniciar_y = posicionyinicial;//20        
        diente1=0;//Dientes para el puente        
        diente2=0;        
        diente=1;
        posix=40;//PosicionX inicial
        posfy=1050;//PosicionY inicial
    }       
    dibuja_contorno_elementos(contexto){
        var ctx = contexto;        
        for(var i=0;i<elementos.length;i++){                            
            var med=elementos[i].med;
            var cua = med/4;
            var ter = cua*3;        
            ctx.strokeStyle = 'red';
            ctx.fillStyle = 'white';
            if(ctx){                              
                elementos[i].figura6.rect(elementos[i].ini_x,elementos[i].ini_y,medida,medida);
                this.dibuja_elemento_superficie1(ctx,elementos[i].figura1,elementos[i].ini_x,elementos[i].ini_y,elementos[i].med,cua,ter);
                this.dibuja_elemento_superficie2(ctx,elementos[i].figura2,elementos[i].ini_x,elementos[i].ini_y,elementos[i].med,cua,ter);
                this.dibuja_elemento_superficie3(ctx,elementos[i].figura3,elementos[i].ini_x,elementos[i].ini_y,elementos[i].med,cua,ter);
                this.dibuja_elemento_superficie4(ctx,elementos[i].figura4,elementos[i].ini_x,elementos[i].ini_y,elementos[i].med,cua,ter);
                this.dibuja_elemento_superficie5(ctx,elementos[i].figura5,elementos[i].ini_x,elementos[i].ini_y,elementos[i].med,cua,ter);                
            }
        }
    }   

    dibuja_elemento_superficie1(ctx,figura,x,y,med,cua,ter){
        figura.moveTo(x,y);
        figura.lineTo(med+x,y);
        figura.lineTo(ter+x,cua+y);
        figura.lineTo(cua+x,cua+y);        
        figura.lineTo(x,y);        
        ctx.stroke(figura);
        ctx.fill(figura); 
    }

    dibuja_elemento_superficie2(ctx,figura,x,y,med,cua,ter){
        figura.moveTo(ter+x,cua+y);
        figura.lineTo(med+x,y);
        figura.lineTo(med+x,med+y);
        figura.lineTo(ter+x,ter+y);
        figura.lineTo(ter+x,cua+y);                
        ctx.stroke(figura);
        ctx.fill(figura);
    }

    dibuja_elemento_superficie3(ctx,figura,x,y,med,cua,ter){
        figura.moveTo(cua+x,ter+y);
        figura.lineTo(ter+x,ter+y);
        figura.lineTo(med+x,med+y);
        figura.lineTo(x,med+y);
        figura.lineTo(cua+x,ter+y);                
        ctx.stroke(figura);
        ctx.fill(figura);       
    }

    dibuja_elemento_superficie4(ctx,figura,x,y,med,cua,ter){
        figura.moveTo(x,y);
        figura.lineTo(cua+x,cua+y);
        figura.lineTo(cua+x,ter+y);
        figura.lineTo(x,med+y);
        figura.lineTo(x,y);                
        ctx.stroke(figura);
        ctx.fill(figura);       
    }

    dibuja_elemento_superficie5(ctx,figura,x,y,med,cua,ter){
        figura.moveTo(cua+x,cua+y);
        figura.lineTo(ter+x,cua+y);
        figura.lineTo(ter+x,ter+y);
        figura.lineTo(cua+x,ter+y);
        figura.lineTo(cua+x,cua+y);
        ctx.stroke(figura);
        ctx.fill(figura);        
    }
    //PASO 1.1.4
    //Dibuja una imagen
    dibuja_imagen(context, inicio_x, inicio_y, nombreImagen,supInf){        
        var img=new Image();
        var imagen_fuente= "../xava/images/dientes/"+nombreImagen.toString()+supInf+".png";        
        if(supInf=='s'){                                       
            this.dibuja_imagen_fuente(context, inicio_x, inicio_y-posdientessup, imagen_fuente);//1.1.4.1           
        }
        if(supInf=='i'){                    
        	this.dibuja_imagen_fuente(context, inicio_x, inicio_y+posdientesinf, imagen_fuente);//1.1.4.1
        }                       
    }   
  //PASO 1.1.4.1
    //Dibuja una imagen desde una fuente
    dibuja_imagen_fuente(context, inicio_x, inicio_y, imagen_fuente){
        var ctx = context;    
        if(ctx){
            var img=new Image();
            img.src = imagen_fuente;
            img.onload = function() {                
            	ctx.drawImage(this, inicio_x,inicio_y);                
            }
        }        
    }   
    //PASO 1.2.2
    //Selecciona el contorno o dibujo
    Marcar(event){                
        var div_can = document.getElementById("canvasesdiv");                     
        var x = event.pageX-div_can.offsetLeft,y = event.pageY-div_can.offsetTop;
        diente=0;
        var seccion=0;
        var div=0;
        for(var i=0;i<elementos.length;i++){    
            diente=parseInt(elementos[i].cod);                 
            if (diente) {
                var accion = this.accion_diente;
                if(!accion){
                    return;
                }
                var seleccion;
                var color='red';
                var estado_diente_lista;
                try {        	   
                    estado_diente_lista=JSON.parse(this.obtener_dato_por_nombre(accion));        	   
                } catch (e) {        	   
                    estado_diente_lista=this.obtener_dato_por_nombre(accion);
                }                                
                if(estado_diente_lista){
                     color = estado_diente_lista['color'];                
                     seleccion=accion=estado_diente_lista['accion'];                               
                }                
                if (seleccion==this.estadoDienteSuperficie){  
                    ctx3.clearRect(0, 0, div_can.width, div_can.height);
                    ctx3.strokeStyle = "red";
                    ctx3.fillStyle = 'white';
                    ctx3.stroke(elementos[i].figura1);
                    ctx3.fill(elementos[i].figura1);
                    ctx3.stroke(elementos[i].figura2);
                    ctx3.fill(elementos[i].figura2);
                    ctx3.stroke(elementos[i].figura3);
                    ctx3.fill(elementos[i].figura3);
                    ctx3.stroke(elementos[i].figura4);
                    ctx3.fill(elementos[i].figura4);
                    ctx3.stroke(elementos[i].figura5);
                    ctx3.fill(elementos[i].figura5);                    
                    if (ctx3.isPointInPath(elementos[i].figura1, event.offsetX, event.offsetY)) {                                                                
                        ctx3.fillStyle = color;
                        ctx3.clearRect(0, 0, div_can.width, div_can.height);
                        ctx3.fill(elementos[i].figura1);
                        break;
                    }                    
                    else if (ctx3.isPointInPath(elementos[i].figura2, event.offsetX, event.offsetY)) {                                
                        ctx3.fillStyle = color;
                        ctx3.clearRect(0, 0, div_can.width, div_can.height);
                        ctx3.fill(elementos[i].figura2);
                        break;
                    } 
                    else if (ctx3.isPointInPath(elementos[i].figura3, event.offsetX, event.offsetY)) {                                
                        ctx3.fillStyle = color;
                        ctx3.clearRect(0, 0, div_can.width, div_can.height);
                        ctx3.fill(elementos[i].figura3);
                        break;
                    } 
                    else if (ctx3.isPointInPath(elementos[i].figura4, event.offsetX, event.offsetY)) {                                
                        ctx3.fillStyle = color;
                        ctx3.clearRect(0, 0, div_can.width, div_can.height);
                        ctx3.fill(elementos[i].figura4);
                        break;
                    } 
                    else if (ctx3.isPointInPath(elementos[i].figura5, event.offsetX, event.offsetY)) {                                
                        ctx3.fillStyle = color;
                        ctx3.clearRect(0, 0, div_can.width, div_can.height);
                        ctx3.fill(elementos[i].figura5);
                        break;
                    } 
                } else {//if(seleccion==estadoDientePieza){
                    ctx3.clearRect(0, 0, div_can.width, div_can.height);
                    ctx3.strokeStyle = "red";
                    ctx3.fillStyle = 'white';
                    ctx3.stroke(elementos[i].figura1);
                    ctx3.fill(elementos[i].figura1);
                    ctx3.stroke(elementos[i].figura2);
                    ctx3.fill(elementos[i].figura2);
                    ctx3.stroke(elementos[i].figura3);
                    ctx3.fill(elementos[i].figura3);
                    ctx3.stroke(elementos[i].figura4);
                    ctx3.fill(elementos[i].figura4);
                    ctx3.stroke(elementos[i].figura5);
                    ctx3.fill(elementos[i].figura5);   
                    if (ctx3.isPointInPath(elementos[i].figura6, event.offsetX, event.offsetY)) {
                        ctx3.clearRect(0, 0, div_can.width, div_can.height);
                        ctx3.stroke(elementos[i].figura6);
                        ctx3.fill(elementos[i].figura6);
                    }
                }
            }                                               
        }       
    }       
    //PASO 1.2.1
    //Pertime establecer los colores de las marcaciones
    //canvas.addEventListener("mousedown", getPosition, false);
    getPosition(event){
        var div_can = document.getElementById("canvasesdiv");                     
        var x = event.pageX-div_can.offsetLeft,y = event.pageY-div_can.offsetTop;
        diente=0;
        var seccion=0;
        var div=0;
        var color='red';
        var accion='';
        var estado_diente_lista;
        var seleccion;
        accion = this.accion_diente;        
        if(!accion){
            return;
        }
        seleccion;
        color='red';
        estado_diente_lista;
        try {        	   
            estado_diente_lista=JSON.parse(this.obtener_dato_por_nombre(accion));        	   
        } catch (e) {        	   
            estado_diente_lista=this.obtener_dato_por_nombre(accion);
        }                                
        if(estado_diente_lista){
             color = estado_diente_lista['color'];                
             seleccion=accion=estado_diente_lista['accion'];                               
        }
        if (seleccion==this.estadoDienteSuperficie){
            for(var i=0;i<elementos.length;i++){
                if (ctx4.isPointInPath(elementos[i].figura1, event.offsetX, event.offsetY)) {                                                                
                    ctx4.fillStyle = color;
                    ctx4.clearRect(0, 0, div_can.width, div_can.height);                    
                    ctx4.fill(elementos[i].figura1);
                    diente=parseInt(elementos[i].cod);
                    break;
                }                    
                else if (ctx4.isPointInPath(elementos[i].figura2, event.offsetX, event.offsetY)) {                                
                    ctx4.fillStyle = color;
                    ctx4.clearRect(0, 0, div_can.width, div_can.height);
                    ctx4.fill(elementos[i].figura2);
                    diente=parseInt(elementos[i].cod);
                    break;
                } 
                else if (ctx4.isPointInPath(elementos[i].figura3, event.offsetX, event.offsetY)) {                                
                    ctx4.fillStyle = color;
                    ctx4.clearRect(0, 0, div_can.width, div_can.height);
                    ctx4.fill(elementos[i].figura3);
                    diente=parseInt(elementos[i].cod);
                    break;
                } 
                else if (ctx4.isPointInPath(elementos[i].figura4, event.offsetX, event.offsetY)) {                                
                    ctx4.fillStyle = color;
                    ctx4.clearRect(0, 0, div_can.width, div_can.height);
                    ctx4.fill(elementos[i].figura4);
                    diente=parseInt(elementos[i].cod);
                    break;
                } 
                else if (ctx4.isPointInPath(elementos[i].figura5, event.offsetX, event.offsetY)) {                                
                    ctx4.fillStyle = color;
                    ctx4.clearRect(0, 0, div_can.width, div_can.height);
                    ctx4.fill(elementos[i].figura5);
                    diente=parseInt(elementos[i].cod);
                    break;
                }                 
            }                                               
        } 
        var figura6=new Path2D();
        var figura_elemento_actual;
        for(var i=0;i<elementos.length;i++){
            if (ctx4.isPointInPath(elementos[i].figura6, event.offsetX, event.offsetY)) {
                diente=parseInt(elementos[i].cod);
                x=elementos[i].ini_x;
                y=elementos[i].ini_y;
                figura6=elementos[i].figura6;
                figura_elemento_actual=elementos[i];
                break;
            }           
        }
        if (diente) {                          
            if(accion == this.estadoDienteExtraccion){                              
                this.marcar_extraccion(ctx4, figura6, color,x,y);
            }else if(accion == this.estadoDientePuente){
                if (diente1==0){
                    diente1=diente;
                    figura_elemento_diente1=figura_elemento_actual;
                }else if(diente2==0){
                    diente2=diente;                    
                    figura_elemento_diente2=figura_elemento_actual;                   
                    if(figura_elemento_diente1.num>figura_elemento_diente2.num){
                        this.marcar_puente(ctx4, figura_elemento_diente2, figura_elemento_diente1);
                    }else{
                        this.marcar_puente(ctx4, figura_elemento_diente1, figura_elemento_diente2);
                    }
                    diente1=0;
                    diente2=0;
                }
            }            
            else if(accion==this.estadoDienteCorrecto){            
                this.marcar_correcto(ctx4, figura6, color,x,y);
            }                	
            else if(accion==this.estadoDienteImplante){            
                this.marcar_tornillo(ctx4, figura6, color,x,y);
            }else if(accion==this.estadoDienteBorrarPuente){
                this.borrar_diente_puente(ctx4, diente);
            }else if(accion == this.estadoDienteBorrar){
                
                this.borrar_diente(ctx4, diente);
            }        
        }               
    }    
    //PASO 1.3.2
    // Funcion para pintar una region del diente
    //utilizado cuando damos click
    dibuja_seccion(contexto, figura, color){
        var div_can = document.getElementById("canvasesdiv");
        var ctx = contexto;
        ctx.fillStyle = color;
        ctx.clearRect(0, 0, div_can.width, div_can.height);                    
        ctx.fill(figura);
    }        
        
    //PASO 1.3.3
    // Funcion para sombrear diente completo
    marcar_extraccion(contexto, figura, color,x,y){
        var ctx = contexto;        
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        figura.moveTo(x,y);
        figura.lineTo(x+40,y+40);
        figura.moveTo(x+40,y);
        figura.lineTo(x,y+40);
        ctx.stroke(figura);       
    }

    marcar_correcto(contexto, figura, color,x,y){
        var ctx = contexto;                
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;                      		
        x+=3;
        y+=15;
		figura.moveTo(x, y);
        figura.lineTo(x+10, y+20);
        figura.lineTo(x+35, y-10);
        figura.lineTo(x+12, y+8);
        figura.lineTo(x, y);
        ctx.stroke(figura);		
    }
    
    marcar_tornillo(contexto, figura, color,x,y){
        var ctx = contexto;               
		ctx.strokeStyle = color;
        x+=16;
        y+=88;
		ctx.lineWidth = 2;                
        ctx.strokeStyle = color;
        figura.moveTo(x-10, y-87);
        figura.lineTo(x+20, y-87);
        ctx.stroke(figura);        
        figura.rect(x-5, y-85, 20, 20);                
        figura.moveTo(x-5, y-65);
        figura.lineTo(x+5, y-50);
        ctx.stroke(figura);                
        figura.moveTo(x+15, y-65);
        figura.lineTo(x+5, y-50);
        ctx.stroke(figura);        
        figura.moveTo(x+20, y-80);
        figura.lineTo(x-10, y-75);
        ctx.stroke(figura);                  
        figura.moveTo(x+20, y-70);
        figura.lineTo(x-10, y-65);
        ctx.stroke(figura);
        figura.moveTo(x+20, y-60);
        figura.lineTo(x-10, y-55);
        ctx.stroke(figura);
	}

    // Funcion para marcar puente
    marcar_puente(ctx, elemento1, elemento2){        
        ctx.lineWidth = 2;
        elemento1.figura6.moveTo(elemento1.ini_x+(medida/2),elemento1.ini_y+50);
        elemento1.figura6.lineTo(elemento2.ini_x+(medida/2),elemento1.ini_y+50);        
        ctx.stroke(elemento1.figura6);        
        ctx.stroke(elemento2.figura6);
    }
    // Funcion para borrar las acciones del diente
    borrar_diente(contexto, num_diente){        
        contexto.fillStyle = 'white';
        contexto.strokeStyle = 'white';
        for(var i=0;i<elementos.length;i++){            
            if(num_diente==elementos[i].cod){                                
                contexto.clearRect(elementos[i].ini_x-2, elementos[i].ini_y-2, medida+10, medida+15);
                break;
            }
        }                      
    }  

    // Funcion para borrar el puente
    borrar_diente_puente(contexto, num_diente){            
        var med = medida;            
        num_diente = num_diente - 1;
        var inicio_y;
        if (num_diente<16){
            inicio_y = posicionyinicial;
        }
        else{
            num_diente = num_diente - 16;
            inicio_y = med + 100+espacionfilasdientes;
        }            
        var inicio_x = (num_diente*med) + (separacion_x*num_diente) + separacion_x;            
        contexto.clearRect(inicio_x-8, inicio_y-8, med+10, inicio_y-30);
    }  
        
    establecer_accion(accion){
        this.accion_diente=accion;
    }
    
    //metodo para cargar los datos de json
    cargar_datos_estado_dietes(datos){    	
        datos_historial=datos;    	
    }

    obtener_dato_por_nombre(nombre){      	   
    	try {
    		datos_historial=JSON.parse(datos_historial);	
		} catch (e) {
			datos_historial=datos_historial;
		}    	    	
    	for (let i in datos_historial) {
		  for (let j in datos_historial[i]) {			  
		    if (datos_historial[i][j].hasOwnProperty('nombre')) {		    			    	
		    	if(nombre==datos_historial[i][j].nombre){		    		
		    		return JSON.stringify(datos_historial[i][j]);                
                }
		    }
		  }
		 }
          return "";
    }
    cargaConstantes(
    		estadoDienteSuperficie,
    		estadoDienteExtraccion,
    		estadoDientePuente,
    		estadoDienteImplante,
    		estadoDienteBorrar,
    		estadoDienteBorrarPuente,
    		estadoDienteCorrecto,
    		estadoDientePieza
    		){
    	this.estadoDienteSuperficie=estadoDienteSuperficie;
    	this.estadoDienteExtraccion=estadoDienteExtraccion;
    	this.estadoDientePuente=estadoDientePuente;
    	this.estadoDienteImplante=estadoDienteImplante;
    	this.estadoDienteBorrar=estadoDienteBorrar;
    	this.estadoDienteBorrarPuente=estadoDienteBorrarPuente;
    	this.estadoDienteCorrecto=estadoDienteCorrecto;
    	this.estadoDientePieza=estadoDientePieza;
    }
}
var estadoDienteSuperficie
var estadoDienteExtraccion;
var estadoDientePuente;
var estadoDienteImplante;
var estadoDienteBorrar;
var estadoDienteBorrarPuente;
var estadoDienteCorrecto;
var estadoDientePieza;
var datos_historial="";
var elementos = []; 
