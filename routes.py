
from flask import render_template, send_from_directory, redirect, url_for, request, flash
from main import app, db
from models import BlogPost
from datetime import datetime
from slugify import slugify

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/blog')
def blog():
    posts = BlogPost.query.filter_by(published=True).order_by(BlogPost.created_at.desc()).all()
    return render_template('blog.html', posts=posts)

@app.route('/blog/<slug>')
def blog_post(slug):
    post = BlogPost.query.filter_by(slug=slug, published=True).first_or_404()
    return render_template('blog_post.html', post=post)

@app.route('/assets/<path:filename>')
def serve_asset(filename):
    return send_from_directory('attached_assets', filename)
