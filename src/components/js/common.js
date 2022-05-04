$(function(){
    // btns
    let createBtn = $('.btnCreate');
    let editBtn = $('.btnEdit');
    let closeBtn = $('.popClose');
    let cancelBtn = $('.popCancel');
    // modal
    let popWindow = $('.pop-window');
    let createWindow = $('.pop-create');
    let editWindow = $('.pop-edit');
    createBtn.click(function(){
        createWindow.show();
    });
    editBtn.click(function(){
        editWindow.show();
    });
    closeBtn.click(function(){
        popWindow.hide();
    });
    cancelBtn.click(function(){
        popWindow.hide();
    });

    // depth1 모달창 열기
    let userAdd = $('.btnAdd');
    userAdd.click(function(){
        popWindow.show();
    });

    // depth2 모달에서 사용자 추가창 열기
    let userAddBtn = $('.userAddBtn');
    let innerPop = $('.inner-pop');
    let innerCancel = $('.btnInCancel');
    let innerPopClose = $('.innerPopClose');
    userAddBtn.click(function(){
        innerPop.show();
    });
    innerCancel.click(function(){
        innerPop.hide();
    });
    innerPopClose.click(function(){
        innerPop.hide();
    });
});