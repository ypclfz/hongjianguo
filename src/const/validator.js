export function checkInventors (a, b, c, required=true) {
	let msg = '';
  let number = 0;
  const reg = /^[1-9][0-9]*$/;
  
  if(b.length == 0) {
    msg = required ? '发明人字段不能为空' : 'success';
  }else {
    for(let d of b) {
    	if( !d.id ) {

    	}
      if( !d.id || !d.share ) {
      	if(!d.id && !d.share) {
      		msg = '请选择发明人并填写贡献率';	
      	}else if(!d.id) {
      		msg = '请选择发明人';
      	}else if(!d.share) {
      		msg = '请填写贡献率';
      	}
        
        break;
      }
    }  
  }
  
  if( !msg ) {
    for(let d of b) {
      let n;
      let flag = !!( reg.test(d.share) && (n = Number.parseInt(d.share)) && n >= 10 && n <= 100 && (number += n) );
      if( !flag ) { 
        msg = '贡献率应为10-100的数字';
        break;
      }
    }
  }

  if( !msg ) {
    if(number !== 100) {
      msg = '各发明人的贡献率之和应为100';
    }
  }

  if( !msg ) {
    if(b.length > 1) {
      const arr = b.map(_=>_.id);
      const set = new Set(arr);
      if(arr.length != set.size) {
        msg = '请不要选择重复的发明人';
      }
    }
  }

  if(msg && msg != 'success') {
    c(msg);              
  }else {
    c();
  }
}