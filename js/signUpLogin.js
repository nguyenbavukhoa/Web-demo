//Signup && Login Form

// Chuyen doi qua lai SignUp & Login
const logregBox = document.querySelector('.logreg-box');
const loginLink = document.querySelector('.login-link');
const signUpLink = document.querySelector('.signup-link');

signUpLink.addEventListener('click', () => {
    logregBox.classList.add('active');
    document.querySelector('.form-description').innerHTML = "Đăng ký thành viên để mua hàng và nhận những ưu đãi đặc biệt từ chúng tôi ";
    document.querySelector('.sign-login-title').innerHTML = "Đăng ký";
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.sign-up-form').style.display = '';
});

loginLink.addEventListener('click', () => {
    logregBox.classList.remove('active');
    document.querySelector('.form-description').innerHTML = "Đăng nhập thành viên để mua hàng và nhận những ưu đãi đặc biệt từ chúng tôi";
    document.querySelector('.sign-login-title').innerHTML = "Đăng nhập";
    document.querySelector('.sign-up-form').style.display = 'none';
    document.querySelector('.login-form').style.display = '';
});

// kiem tra link
window.onload = showPage();

function showPage() {
    let functionID = new URLSearchParams(window.location.search).get('id');
    if (functionID == 'signup') {
        logregBox.classList.add('active');
        document.querySelector('.form-description').innerHTML = "Đăng ký thành viên để mua hàng và nhận những ưu đãi đặc biệt từ chúng tôi ";
        document.querySelector('.sign-login-title').innerHTML = "Đăng ký";
    }
}

// Chức năng đăng ký
let signupButton = document.getElementById('signup-button');
let loginButton = document.getElementById('login-button');
signupButton.addEventListener('click', () => {
    event.preventDefault();
    let fullNameUser = document.getElementById('fullname').value;
    let phoneUser = document.getElementById('phone').value;
    let passwordUser = document.getElementById('password').value;
    let passwordConfirmation = document.getElementById('password_confirmation').value;
    let checkSignup = document.getElementById('checkbox-signup').checked;
    // Check validate
    if (fullNameUser.length == 0) {
        document.querySelector('.form-message-name').innerHTML = 'Vui lòng nhập họ vâ tên';
        document.getElementById('fullname').focus();
    } else if (fullNameUser.length < 3) {
        document.getElementById('fullname').value = '';
        document.querySelector('.form-message-name').innerHTML = 'Vui lòng nhập họ và tên lớn hơn 3 kí tự';
    } else {
        document.querySelector('.form-message-name').innerHTML = '';
    }
    if (phoneUser.length == 0) {
        document.querySelector('.form-message-phone').innerHTML = 'Vui lòng nhập vào số điện thoại';
    } else if (phoneUser.length != 10) {
        document.querySelector('.form-message-phone').innerHTML = 'Vui lòng nhập vào số điện thoại 10 số';
        document.getElementById('phone').value = '';
    } else {
        document.querySelector('.form-message-phone').innerHTML = '';
    }
    if (passwordUser.length == 0) {
        document.querySelector('.form-message-password').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passwordUser.length < 6) {
        document.querySelector('.form-message-password').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('password').value = '';
    } else {
        document.querySelector('.form-message-password').innerHTML = '';
    }
    if (passwordConfirmation.length == 0) {
        document.querySelector('.form-message-password-confi').innerHTML = 'Vui lòng nhập lại mật khẩu';
    } else if (passwordConfirmation !== passwordUser) {
        document.querySelector('.form-message-password-confi').innerHTML = 'Mật khẩu không khớp';
        document.getElementById('password_confirmation').value = '';
    } else {
        document.querySelector('.form-message-password-confi').innerHTML = '';
    }
    if (checkSignup != true) {
        document.querySelector('.form-message-checkbox').innerHTML = 'Vui lòng đồng ý với chính sách !';
    } else {
        document.querySelector('.form-message-checkbox').innerHTML = '';
    }

    if (fullNameUser && phoneUser && passwordUser && passwordConfirmation && checkSignup) {
        if (passwordConfirmation == passwordUser) {
            let user = {
                fullname: fullNameUser,
                phone: phoneUser,
                password: passwordUser,
                address: '',
                email: '',
                status: 1,
                join: new Date(),
                cart: [],
                userType: 0
            }
            let accounts = localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : [];
            let checkloop = accounts.some(account => {
                return account.phone == user.phone;
            })
            if (!checkloop) {
                accounts.push(user);
                localStorage.setItem('accounts', JSON.stringify(accounts));
                localStorage.setItem('currentuser', JSON.stringify(user));
                toast({ title: 'Thành công', message: 'Tạo thành công tài khoản !', type: 'success', duration: 3000 });
                setTimeout(() => {
                    window.location.replace('./index.html');
                }, 1500);
            } else {
                toast({ title: 'Thất bại', message: 'Tài khoản đã tồn tại !', type: 'error', duration: 3000 });
            }
        } else {
            toast({ title: 'Thất bại', message: 'Sai mật khẩu !', type: 'error', duration: 3000 });
        }
    }
})


function checkAdmin() {
    let user = JSON.parse(localStorage.getItem('currentuser'));
    if (user && user.userType == 1) {
        window.location.replace('./admin.html');
    }
}

// Dang nhap
loginButton.addEventListener('click', () => {
    event.preventDefault();
    let phonelog = document.getElementById('phone-login').value;
    let passlog = document.getElementById('password-login').value;
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    if (phonelog.length == 0) {
        document.querySelector('.form-message.phonelog').innerHTML = 'Vui lòng nhập vào số điện thoại';
    } else if (phonelog.length != 10) {
        document.querySelector('.form-message.phonelog').innerHTML = 'Vui lòng nhập vào số điện thoại 10 số';
        document.getElementById('phone-login').value = '';
    } else {
        document.querySelector('.form-message.phonelog').innerHTML = '';
    }

    if (passlog.length == 0) {
        document.querySelector('.form-message-check-login').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passlog.length < 6) {
        document.querySelector('.form-message-check-login').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('passwordlogin').value = '';
    } else {
        document.querySelector('.form-message-check-login').innerHTML = '';
    }

    if (phonelog && passlog) {
        let vitri = accounts.findIndex(item => item.phone === phonelog);
        if (vitri == -1) {
            toast({ title: 'Error', message: 'Tài khoản của bạn không tồn tại', type: 'error', duration: 3000 });
        } else if (accounts[vitri].password == passlog) {
            if (accounts[vitri].status == 0) {
                toast({ title: 'Warning', message: 'Tài khoản của bạn đã bị khóa', type: 'warning', duration: 3000 });
            } else {
                localStorage.setItem('currentuser', JSON.stringify(accounts[vitri]));
                toast({ title: 'Success', message: 'Đăng nhập thành công', type: 'success', duration: 3000 });
                checkAdmin();
                setTimeout(() => {
                    window.location.replace('./index.html');
                }, 1500);
            }
        } else {
            toast({ title: 'Warning', message: 'Sai mật khẩu', type: 'warning', duration: 3000 });
        }
    }
})