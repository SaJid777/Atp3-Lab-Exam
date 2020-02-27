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
		res.render('home/index', {user: result});
	});
});

router.get('/view_users', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/view_users', {userlist: results});
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/view_customers', function(req, res){
	
		userModel.getAllCustomers(function(results){
			if(results.length > 0){
				res.render('home/view_customers', {customerlist: results});
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/view_admins', function(req, res){
	
		userModel.getAllAdmins(function(results){
			if(results.length > 0){
				res.render('home/view_admins', {adminlist: results});
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/view_books', function(req, res){
	
		userModel.getAllBooks(function(results){
			if(results.length > 0){
				res.render('home/view_books', {booklist: results});
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/edit/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
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
				res.redirect('/home/edit/'+req.params.id);
			}
		});
});

router.get('/delete/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.delete(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/view_users');
			}
		});
});

router.get('/delete_cus/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.delete(user, function(status){
			if(status){
				res.redirect('/home/view_customers');
			}else{
				res.redirect('/home/view_customers');
			}
		});
});

router.get('/delete_admin/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.delete(user, function(status){
			if(status){
				res.redirect('/home/view_admins');
			}else{
				res.redirect('/home/view_admins');
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
				res.redirect('/home/view_books');
			}else{
				res.redirect('/home/view_books');
			}
		});
});

router.get('/addBook', function(req, res){
	
		res.render('home/addBook');
	
});


router.post('/addBook', function(req, res){
	
		var book = {
			id: req.body.id,
			bookname: req.body.bookname,
			price: req.body.price,
			type: req.body.type,
			author: req.body.author,
			description: req.body.description
		};

		userModel.insertBook(book, function(status){
			if(status){
				res.redirect('/home/view_books');
			}else{
				res.redirect('/home/view_books');
			}
		});
});


module.exports = router;