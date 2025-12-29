from datetime import datetime

def add_global_context(request):
    """
    Adds a global context for use among all templates, especially base.html.
    """
    return {
        'site_title': 'Site Title',
        'copyright_name': 'Copyright Name',
        'copyright_year': datetime.now().year,
        'site_logo_url': 'site_pictures/logo.png',
    }