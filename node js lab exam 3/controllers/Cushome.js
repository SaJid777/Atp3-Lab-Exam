var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result){
		res.render('Cushome/index', {user: result});
	});
});



router.get('/view_books', function(req, res){
	
		userModel.getAllBooks(function(results){
			if(results.length > 0){
				res.render('Cushome/view_books', {booklist: results});
			}else{
				res.redirect('/Cushome');
			}
		});
});

router.get('/edit/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('Cushome/edit', {user: result});
	});
});

router.post('/edit/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/login');
			}else{
				res.redirect('/Cushome/edit/'+req.params.id);
			}
		});
});




router.get('/delete_book/:id', function(req, res){
	
		var book = {
			id: req.params.id,
			bookname: req.body.bookname,
			price: req.body.price,
			type: req.body.type,
			author: req.body.author,
			description: req.body.description
		};

		userModel.deleteBook(book, function(status){
			if(status){
				res.redirect('/Cushome/view_books');
			}else{
				res.redirect('/Cushome/view_books');
			}
		});
});

router.get('/book_details/:id', function(req, res){
	userModel.getByIdBook(req.params.id, function(result){
		res.render('Cushome/book_details', {book: result});
	});
});



module.exports = router;