const taskValidates = {
  titleValidates: (value: any): any =>{
    if (!value) return '入力必須項目です';
    return true;
  },
};

export {taskValidates};