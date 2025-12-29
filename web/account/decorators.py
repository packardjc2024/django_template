from functools import wraps
from django.shortcuts import redirect


def otp_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('account:user_login')
        if not request.session.get('otp_verified'):
            return redirect('account:otp')
        return view_func(request, *args, **kwargs)
    return wrapper