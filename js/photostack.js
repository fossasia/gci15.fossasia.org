
;( function( window ) {

	'use strict';

	
	Modernizr.addTest('csstransformspreserve3d', function () {
		var prop = Modernizr.prefixed('transformStyle');
		var val = 'preserve-3d';
		var computedStyle;
		if(!prop) return false;

		prop = prop.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

		Modernizr.testStyles('#modernizr{' + prop + ':' + val + ';}', function (el, rule) {
			computedStyle = window.getComputedStyle ? getComputedStyle(el, null).getPropertyValue(prop) : '';
		});

		return (computedStyle === val);
	});

	var support = { 
			transitions : Modernizr.csstransitions,
			preserve3d : Modernizr.csstransformspreserve3d
		},
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ];

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function shuffleMArray( marray ) {
		var arr = [], marrlen = marray.length, inArrLen = marray[0].length;
		for(var i = 0; i < marrlen; i++) {
			arr = arr.concat( marray[i] );
		}
		// shuffle 2 d array
		arr = shuffleArr( arr );
		// to 2d
		var newmarr = [], pos = 0;
		for( var j = 0; j < marrlen; j++ ) {
			var tmparr = [];
			for( var k = 0; k < inArrLen; k++ ) {
				tmparr.push( arr[ pos ] );
				pos++;
			}
			newmarr.push( tmparr );
		}
		return newmarr;
	}

	function shuffleArr( array ) {
		var m = array.length, t, i;
		// While there remain elements to shuffleâ€¦
		while (m) {
			// Pick a remaining elementâ€¦
			i = Math.floor(Math.random() * m--);
			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}
		return array;
	}

	function Photostack( el, options ) {
		this.el = el;
		this.inner = this.el.querySelector( 'div' );
		this.allItems = [].slice.call( this.inner.children );
		this.allItemsCount = this.allItems.length;
		if( !this.allItemsCount ) return;
		this.items = [].slice.call( this.inner.querySelectorAll( 'figure:not([data-dummy])' ) );
		this.itemsCount = this.items.length;
		// index of the current photo
		this.current = 0;
		this.options = extend( {}, this.options );
  		extend( this.options, options );
  		this._init();
	}

	Photostack.prototype.options = {};

	Photostack.prototype._init = function() {
		this.currentItem = this.items[ this.current ];
		this._addNavigation();
		this._getSizes();
		this._initEvents();
	}

	Photostack.prototype._addNavigation = function() {
		// add nav dots
		this.nav = document.createElement( 'nav' )
		var inner = '';
		for( var i = 0; i < this.itemsCount; ++i ) {
			inner += '<span></span>';
		}
		this.nav.innerHTML = inner;
		this.el.appendChild( this.nav );
		this.navDots = [].slice.call( this.nav.children );
	}

	Photostack.prototype._initEvents = function() {
		var self = this,
			beforeStep = classie.hasClass( this.el, 'photostack-start' ),
			open = function() {
				var setTransition = function() { 
					if( support.transitions ) {
						classie.addClass( self.el, 'photostack-transition' ); 
					}
				}
				if( beforeStep ) {
					this.removeEventListener( 'click', open ); 
					classie.removeClass( self.el, 'photostack-start' );
					setTransition();
				}
				else {
					self.openDefault = true;
					setTimeout( setTransition, 25 );
				}
				self.started = true; 
				self._showPhoto( self.current );
			};

		if( beforeStep ) {
			this._shuffle();
			this.el.addEventListener( 'click', open );
		}
		else {
			open();
		}

		this.navDots.forEach( function( dot, idx ) {
			dot.addEventListener( 'click', function() {
				// rotate the photo if clicking on the current dot
				if( idx === self.current ) {
					self._rotateItem();
				}
				else {
					// if the photo is flipped then rotate it back before shuffling again
					var callback = function() { self._showPhoto( idx ); }
					if( self.flipped ) {
						self._rotateItem( callback );
					}
					else {
						callback();
					}
				}
			} );
		} );

		window.addEventListener( 'resize', function() { self._resizeHandler(); } );
	}

	Photostack.prototype._resizeHandler = function() {
		var self = this;
		function delayed() {
			self._resize();
			self._resizeTimeout = null;
		}
		if ( this._resizeTimeout ) {
			clearTimeout( this._resizeTimeout );
		}
		this._resizeTimeout = setTimeout( delayed, 100 );
	}

	Photostack.prototype._resize = function() {
		var self = this, callback = function() { self._shuffle( true ); }
		this._getSizes();
		if( this.started && this.flipped ) {
			this._rotateItem( callback );
		}
		else {
			callback();
		}
	}

	Photostack.prototype._showPhoto = function( pos ) {
		if( this.isShuffling ) {
			return false;
		}
		this.isShuffling = true;

		// if there is something behind..
		if( classie.hasClass( this.currentItem, 'photostack-flip' ) ) {
			this._removeItemPerspective();
			classie.removeClass( this.navDots[ this.current ], 'flippable' );
		}

		classie.removeClass( this.navDots[ this.current ], 'current' );
		classie.removeClass( this.currentItem, 'photostack-current' );
		
		// change current
		this.current = pos;
		this.currentItem = this.items[ this.current ];
		
		classie.addClass( this.navDots[ this.current ], 'current' );
		// if there is something behind..
		if( this.currentItem.querySelector( '.photostack-back' ) ) {
			// nav dot gets class flippable
			classie.addClass( this.navDots[ pos ], 'flippable' );
		}

		// shuffle a bit
		this._shuffle();
	}

	// display items (randomly)
	Photostack.prototype._shuffle = function( resize ) {
		var iter = resize ? 1 : this.currentItem.getAttribute( 'data-shuffle-iteration' ) || 1;
		if( iter <= 0 || !this.started || this.openDefault ) { iter = 1; }
		// first item is open by default
		if( this.openDefault ) {
			// change transform-origin
			classie.addClass( this.currentItem, 'photostack-flip' );
			this.openDefault = false;
			this.isShuffling = false;
		}
		
		var overlapFactor = .5,
			// lines & columns
			lines = Math.ceil(this.sizes.inner.width / (this.sizes.item.width * overlapFactor) ),
			columns = Math.ceil(this.sizes.inner.height / (this.sizes.item.height * overlapFactor) ),
			// since we are rounding up the previous calcs we need to know how much more we are adding to the calcs for both x and y axis
			addX = lines * this.sizes.item.width * overlapFactor + this.sizes.item.width/2 - this.sizes.inner.width,
			addY = columns * this.sizes.item.height * overlapFactor + this.sizes.item.height/2 - this.sizes.inner.height,
			// we will want to center the grid
			extraX = addX / 2,
			extraY = addY / 2,
			// max and min rotation angles
			maxrot = 35, minrot = -35,
			self = this,
			// translate/rotate items
			moveItems = function() {
				--iter;
				// create a "grid" of possible positions
				var grid = [];
				// populate the positions grid
				for( var i = 0; i < columns; ++i ) {
					var col = grid[ i ] = [];
					for( var j = 0; j < lines; ++j ) {
						var xVal = j * (self.sizes.item.width * overlapFactor) - extraX,
							yVal = i * (self.sizes.item.height * overlapFactor) - extraY,
							olx = 0, oly = 0;

						if( self.started && iter === 0 ) {
							var ol = self._isOverlapping( { x : xVal, y : yVal } );
							if( ol.overlapping ) {
								olx = ol.noOverlap.x;
								oly = ol.noOverlap.y;
								var r = Math.floor( Math.random() * 3 );
								switch(r) {
									case 0 : olx = 0; break;
									case 1 : oly = 0; break;
								}
							}
						}

						col[ j ] = { x : xVal + olx, y : yVal + oly };
					}
				}
				// shuffle
				grid = shuffleMArray(grid);

				var l = 0, c = 0, cntItemsAnim = 0;
				self.allItems.forEach( function( item, i ) {
					// pick a random item from the grid
					if( l === lines - 1 ) {
						c = c === columns - 1 ? 0 : c + 1;
						l = 1;
					}
					else {
						++l
					}

					var randXPos = Math.floor( Math.random() * lines ),
						randYPos = Math.floor( Math.random() * columns ),
						gridVal = grid[c][l-1],
						translation = { x : gridVal.x, y : gridVal.y },
						onEndTransitionFn = function() {
							++cntItemsAnim;
							if( support.transitions ) {
								this.removeEventListener( transEndEventName, onEndTransitionFn );
							}
							if( cntItemsAnim === self.allItemsCount ) {
								if( iter > 0 ) {
									moveItems.call();
								}
								else {
									// change transform-origin
									classie.addClass( self.currentItem, 'photostack-flip' );
									// all done..
									self.isShuffling = false;
									if( typeof self.options.callback === 'function' ) {
										self.options.callback( self.currentItem );
									}
								}
							}
						};

					if(self.items.indexOf(item) === self.current && self.started && iter === 0) {
						self.currentItem.style.WebkitTransform = 'translate(' + self.centerItem.x + 'px,' + self.centerItem.y + 'px) rotate(0deg)';
						self.currentItem.style.msTransform = 'translate(' + self.centerItem.x + 'px,' + self.centerItem.y + 'px) rotate(0deg)';
						self.currentItem.style.transform = 'translate(' + self.centerItem.x + 'px,' + self.centerItem.y + 'px) rotate(0deg)';
						// if there is something behind..
						if( self.currentItem.querySelector( '.photostack-back' ) ) {
							self._addItemPerspective();
						}
						classie.addClass( self.currentItem, 'photostack-current' );
					}
					else {
						item.style.WebkitTransform = 'translate(' + translation.x + 'px,' + translation.y + 'px) rotate(' + Math.floor( Math.random() * (maxrot - minrot + 1) + minrot ) + 'deg)';
						item.style.msTransform = 'translate(' + translation.x + 'px,' + translation.y + 'px) rotate(' + Math.floor( Math.random() * (maxrot - minrot + 1) + minrot ) + 'deg)';
						item.style.transform = 'translate(' + translation.x + 'px,' + translation.y + 'px) rotate(' + Math.floor( Math.random() * (maxrot - minrot + 1) + minrot ) + 'deg)';
					}

					if( self.started ) {
						if( support.transitions ) {
							item.addEventListener( transEndEventName, onEndTransitionFn );
						}
						else {
							onEndTransitionFn();
						}
					}
				} );
			};

		moveItems.call();
	}

	Photostack.prototype._getSizes = function() {
		this.sizes = {
			inner : { width : this.inner.offsetWidth, height : this.inner.offsetHeight },
			item : { width : this.currentItem.offsetWidth, height : this.currentItem.offsetHeight }
		};
		
		// translation values to center an item
		this.centerItem = { x : this.sizes.inner.width / 2 - this.sizes.item.width / 2, y : this.sizes.inner.height / 2 - this.sizes.item.height / 2 };
	}

	Photostack.prototype._isOverlapping = function( itemVal ) {
		var dxArea = this.sizes.item.width + this.sizes.item.width / 3, // adding some extra avoids any rotated item to touch the central area
			dyArea = this.sizes.item.height + this.sizes.item.height / 3,
			areaVal = { x : this.sizes.inner.width / 2 - dxArea / 2, y : this.sizes.inner.height / 2 - dyArea / 2 },
			dxItem = this.sizes.item.width,
			dyItem = this.sizes.item.height;

		if( !(( itemVal.x + dxItem ) < areaVal.x ||
			itemVal.x > ( areaVal.x + dxArea ) ||
			( itemVal.y + dyItem ) < areaVal.y ||
			itemVal.y > ( areaVal.y + dyArea )) ) {
				// how much to move so it does not overlap?
				// move left / or move right
				var left = Math.random() < 0.5,
					randExtraX = Math.floor( Math.random() * (dxItem/4 + 1) ),
					randExtraY = Math.floor( Math.random() * (dyItem/4 + 1) ),
					noOverlapX = left ? (itemVal.x - areaVal.x + dxItem) * -1 - randExtraX : (areaVal.x + dxArea) - (itemVal.x + dxItem) + dxItem + randExtraX,
					noOverlapY = left ? (itemVal.y - areaVal.y + dyItem) * -1 - randExtraY : (areaVal.y + dyArea) - (itemVal.y + dyItem) + dyItem + randExtraY;

				return {
					overlapping : true,
					noOverlap : { x : noOverlapX, y : noOverlapY }
				}
		}
		return {
			overlapping : false
		}
	}

	Photostack.prototype._addItemPerspective = function() {
		classie.addClass( this.el, 'photostack-perspective' );
	}

	Photostack.prototype._removeItemPerspective = function() {
		classie.removeClass( this.el, 'photostack-perspective' );
		classie.removeClass( this.currentItem, 'photostack-flip' );
	}

	Photostack.prototype._rotateItem = function( callback ) {
		if( classie.hasClass( this.el, 'photostack-perspective' ) && !this.isRotating && !this.isShuffling ) {
			this.isRotating = true;

			var self = this, onEndTransitionFn = function() {
					if( support.transitions && support.preserve3d ) {
						this.removeEventListener( transEndEventName, onEndTransitionFn );
					}
					self.isRotating = false;
					if( typeof callback === 'function' ) {
						callback();
					}
				};

			if( this.flipped ) {
				classie.removeClass( this.navDots[ this.current ], 'flip' );
				if( support.preserve3d ) {
					this.currentItem.style.WebkitTransform = 'translate(' + this.centerItem.x + 'px,' + this.centerItem.y + 'px) rotateY(0deg)';
					this.currentItem.style.transform = 'translate(' + this.centerItem.x + 'px,' + this.centerItem.y + 'px) rotateY(0deg)';
				}
				else {
					classie.removeClass( this.currentItem, 'photostack-showback' );
				}
			}
			else {
				classie.addClass( this.navDots[ this.current ], 'flip' );
				if( support.preserve3d ) {
					this.currentItem.style.WebkitTransform = 'translate(' + this.centerItem.x + 'px,' + this.centerItem.y + 'px) translate(' + this.sizes.item.width + 'px) rotateY(-179.9deg)';
					this.currentItem.style.transform = 'translate(' + this.centerItem.x + 'px,' + this.centerItem.y + 'px) translate(' + this.sizes.item.width + 'px) rotateY(-179.9deg)';
				}
				else {
					classie.addClass( this.currentItem, 'photostack-showback' );
				}
			}

			this.flipped = !this.flipped;
			if( support.transitions && support.preserve3d ) {
				this.currentItem.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
	}

	window.Photostack = Photostack;

})( window );