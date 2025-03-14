import os
from flask import Flask, render_template, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "default-secret-key")

# Configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///blog.db")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

# Initialize the app with the extension
db.init_app(app)

# Import models and create tables
with app.app_context():
    import models
    db.create_all()

# Routes
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    
# This is for Vercel serverless deployment
app = app
