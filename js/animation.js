/* =========================================================
   animation.js вЂ” Р СѓСЃСЃРєРёРµ Р”РµСЂРµРІСЊСЏ
   ========================================================= */

/* в”Ђв”Ђ РџР»Р°РІРЅС‹Р№ СЃРєСЂРѕР»Р» Рє СЃРµРєС†РёРё в”Ђв”Ђ */
function scrollToSection(id) {
  var el = document.getElementById(id);
  var scrollContainer = document.querySelector('.scroll-container');
  if (el && scrollContainer) {
    var containerRect = scrollContainer.getBoundingClientRect();
    var rect = el.getBoundingClientRect();
    var top = rect.top - containerRect.top + scrollContainer.scrollTop - 120;
    scrollContainer.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  } else if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* в”Ђв”Ђ РћС‚РїСЂР°РІРєР° С„РѕСЂРјС‹ в”Ђв”Ђ */
function submitForm() {
  var name   = document.getElementById('input-name');
  var phone  = document.getElementById('input-phone');
  var agree  = document.getElementById('input-agree');
  var email  = document.getElementById('input-email');
  var comment = document.getElementById('input-comment');
  var btn    = document.getElementById('contact-form-submit-button');
  var btnTxt = btn ? btn.querySelector('.contact-form-submit-text') : null;

  if (!name || !name.value.trim()) {
    shakeField(name); return;
  }
  if (!phone || phone.value.replace(/\D/g, '').length < 11) {
    shakeField(phone); return;
  }
  if (!agree || !agree.checked) {
    if (agree) agree.parentElement.style.animation = 'shake 0.4s ease';
    setTimeout(function () {
      if (agree) agree.parentElement.style.animation = '';
    }, 500);
    return;
  }

  /* Р’РёР·СѓР°Р»СЊРЅС‹Р№ С„РёРґР±СЌРє СѓСЃРїРµС…Р° */
  if (btnTxt) {
    btnTxt.textContent = '\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e';
    name.value = '';
    phone.value = '+7';
    if (email) email.value = '';
    if (comment) comment.value = '';
    if (comment) comment.dispatchEvent(new Event('input'));
    var formBlock = document.getElementById('contact-form-section');
    if (formBlock) formBlock.classList.remove('comment-editing');
    if (agree) agree.checked = false;
    document.querySelectorAll('input[name="person_type"]').forEach(function (radio) {
      radio.checked = false;
    });
    if (btn) btn.style.pointerEvents = 'none';
    setTimeout(function () {
      if (btnTxt) btnTxt.textContent = '\u041e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443';
      if (btn)    btn.style.pointerEvents = '';
    }, 3500);
  }
}

function shakeField(el) {
  if (!el) return;
  el.style.animation = 'shake 0.4s ease';
  el.focus();
  setTimeout(function () { el.style.animation = ''; }, 500);
}

/* в”Ђв”Ђ Р“Р»Р°РІРЅС‹Р№ init в”Ђв”Ђ */
document.addEventListener('DOMContentLoaded', function () {

  var scrollToTopButton = document.getElementById('scroll-to-top-button');
  var topScrollContainer = document.querySelector('.scroll-container');
  if (scrollToTopButton && topScrollContainer) {
    function updateScrollToTopButton() {
      if (topScrollContainer.scrollTop > 500) {
        scrollToTopButton.classList.add('is-visible');
      } else {
        scrollToTopButton.classList.remove('is-visible');
      }
    }

    scrollToTopButton.addEventListener('click', function () {
      topScrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    });

    topScrollContainer.addEventListener('scroll', updateScrollToTopButton, { passive: true });
    updateScrollToTopButton();
  }

  var siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    var navLine = siteHeader.querySelector('.site-header-active-link-line');
    var navLinks = siteHeader.querySelectorAll('.header-nav-link');
    var activeNavLink = siteHeader.querySelector('.header-nav-link.is-active') || navLinks[0];

    function moveNavLineTo(link, instant) {
      if (!navLine || !link) return;
      var headerRect = siteHeader.getBoundingClientRect();
      var linkRect = link.getBoundingClientRect();
      var rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      var nextLeft = linkRect.left - headerRect.left - rem * 0.5;

      if (instant) navLine.style.transition = 'none';
      navLine.style.left = nextLeft + 'px';
      if (instant) {
        navLine.offsetHeight;
        navLine.style.transition = '';
      }
    }

    moveNavLineTo(activeNavLink, true);

    navLinks.forEach(function (link) {
      link.addEventListener('mouseenter', function () {
        moveNavLineTo(link, false);
      });

      link.addEventListener('mouseleave', function () {
        moveNavLineTo(activeNavLink, false);
      });

      link.addEventListener('click', function (event) {
        var href = link.getAttribute('href');
        if (!href || href.charAt(0) === '#') return;

        event.preventDefault();
        activeNavLink = link;
        navLinks.forEach(function (item) { item.classList.remove('is-active'); });
        link.classList.add('is-active');
        moveNavLineTo(link, false);

        setTimeout(function () {
          window.location.href = href;
        }, 260);
      });
    });

    window.addEventListener('resize', function () {
      moveNavLineTo(activeNavLink, true);
    });
  }

  /* в”Ђв”Ђ Scroll-Р°РЅРёРјР°С†РёРё (IntersectionObserver) в”Ђв”Ђ */
  var animEls = document.querySelectorAll(
    '.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-about-arrow, .anim-team-light'
  );

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible');
        if (entry.target.classList.contains('anim-team-light')) {
          var teamSection = document.getElementById('team-section');
          if (teamSection) {
            teamSection.classList.add('team-scene-started');
          }
        }
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animEls.forEach(function (el) { sectionObserver.observe(el); });

  /* в”Ђв”Ђ РЎС‡С‘С‚С‡РёРєРё (Р·Р°РґРµСЂР¶РєР° С‡РµСЂРµР· data-delay) в”Ђв”Ђ */
  var counters = document.querySelectorAll('.anim-counter');
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
        setTimeout(function () {
          entry.target.classList.add('anim-visible');
          entry.target.style.animationDelay = '0ms';
        }, delay);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(function (el) { counterObserver.observe(el); });

  /* в”Ђв”Ђ Hero intro (РїРѕСЏРІР»РµРЅРёРµ С‚РµРєСЃС‚РѕРІ РїСЂРё Р·Р°РіСЂСѓР·РєРµ) в”Ђв”Ђ */
  var heroIds = [
    'hero-title-russian', // Р РЈРЎРЎРљРР•
    'hero-title-trees', // Р”Р•Р Р•Р’Р¬РЇ
    'hero-subtitle-benefits', // РћРџР«Рў. РљРђР§Р•РЎРўР’Рћ. Р’Р«Р“РћР”Рђ.
    'hero-short-divider', // Р»РёРЅРёСЏ
    'hero-catalog-button', // РєРЅРѕРїРєР° РЎРњРћРўР Р•РўР¬ РљРђРўРђР›РћР“
    'hero-advantage-cards', // РєР°СЂС‚РѕС‡РєРё-РёРєРѕРЅРєРё
    'hero-company-description', // РћРџРўРћР’Рћ Р›РћР“РРЎРўРР§Р•РЎРљРР™
  ];

  heroIds.forEach(function (id, i) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    setTimeout(function () {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 180 + i * 130);
  });

  /* в”Ђв”Ђ Р¤РѕРЅРѕРІРѕРµ РёР·РѕР±СЂР°Р¶РµРЅРёРµ hero (fade-in) в”Ђв”Ђ */
  var heroCardIds = [
    'hero-choice-help-card-bg',
    'hero-media-card-bg',
    'hero-best-option-card-bg',
    'hero-discount-card-bg',
    'hero-deal-card-bg'
  ];
  var heroCards = heroCardIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if (heroCards.length) {
    var activeHeroCard = 0;

    function updateHeroCards() {
      if (activeHeroCard >= heroCards.length) {
        heroCards.forEach(function (card) {
          card.style.backgroundColor = 'rgba(255,255,255,0.15)';
          card.classList.remove('hero-card-active');
        });
        activeHeroCard = 0;
        return;
      }

      heroCards[activeHeroCard].style.backgroundColor = 'rgba(255,255,255,1)';
      heroCards[activeHeroCard].classList.add('hero-card-active');
      activeHeroCard += 1;
    }

    heroCards.forEach(function (card) {
      card.style.backgroundColor = 'rgba(255,255,255,0.15)';
      card.classList.remove('hero-card-active');
    });
    updateHeroCards();
    setInterval(updateHeroCards, 550);
  }
  var heroBg = document.getElementById('hero-background-image');
  if (heroBg) {
    heroBg.style.opacity = '0';
    heroBg.style.transition = 'opacity 1.2s ease';
    setTimeout(function () {
      heroBg.style.opacity = '0.62';
    }, 50);
  }

  /* в”Ђв”Ђ Р Р°РґРёРѕ-РєРЅРѕРїРєРё: РІРёР·СѓР°Р»СЊРЅРѕРµ РІС‹РґРµР»РµРЅРёРµ в”Ђв”Ђ */
  var radioFiz  = document.getElementById('radio-fiz');
  var radioYur  = document.getElementById('radio-yur');
  var groupFiz  = document.getElementById('contact-person-individual-option');
  var groupYur  = document.getElementById('contact-person-company-option');

  function updateRadio() {
    if (radioFiz && radioFiz.checked) {
      if (groupFiz) groupFiz.style.opacity = '1';
      if (groupYur) groupYur.style.opacity = '1';
    } else if (radioYur && radioYur.checked) {
      if (groupFiz) groupFiz.style.opacity = '1';
      if (groupYur) groupYur.style.opacity = '1';
    }
  }

  if (radioFiz) radioFiz.addEventListener('change', updateRadio);
  if (radioYur) radioYur.addEventListener('change', updateRadio);
  var phoneInput = document.getElementById('input-phone');
  if (phoneInput) {
    if (!phoneInput.value.trim()) phoneInput.value = '+7';
    var phoneField = phoneInput.parentElement;

    function updatePhoneMask(digits) {
      if (!phoneField) return;
      if (digits && digits.length > 0) {
        phoneField.classList.add('phone-has-value');
      } else {
        phoneField.classList.remove('phone-has-value');
      }
    }

    phoneInput.addEventListener('input', function () {
      var digits = phoneInput.value.replace(/\D/g, '');
      if (digits.charAt(0) === '8') digits = '7' + digits.slice(1);
      if (digits.charAt(0) === '7') digits = digits.slice(1);
      digits = digits.slice(0, 10);
      updatePhoneMask(digits);

      var formatted = '+7';
      if (digits.length > 0) formatted += ' ' + digits.slice(0, 3);
      if (digits.length > 3) formatted += ' ' + digits.slice(3, 6);
      if (digits.length > 6) formatted += ' ' + digits.slice(6, 8);
      if (digits.length > 8) formatted += ' ' + digits.slice(8, 10);

      phoneInput.value = formatted;
    });

    phoneInput.addEventListener('blur', function () {
      if (phoneInput.value.replace(/\D/g, '') === '7') {
        phoneInput.value = '+7';
        updatePhoneMask('');
      }
    });
  }

  /* в”Ђв”Ђ Input: РїРѕРґСЃРІРµС‚РєР° СЂР°РјРєРё РїСЂРё С„РѕРєСѓСЃРµ в”Ђв”Ђ */
  var inputs = document.querySelectorAll('.form-input-field, .form-textarea-field');
  inputs.forEach(function (inp) {
    var parent = inp.parentElement;
    inp.addEventListener('focus', function () {
      if (parent) parent.style.boxShadow = '0 0 0 2px rgba(33,205,0,0.6)';
    });
    inp.addEventListener('blur', function () {
      if (parent) parent.style.boxShadow = '';
    });
  });

  var commentInput = document.getElementById('input-comment');
  if (commentInput) {
    var commentParent = commentInput.parentElement;
    var commentClose = document.getElementById('comment-close');
    var contactForm = document.getElementById('contact-form-section');
    var minCommentHeight = commentInput.offsetHeight || 77;

    function resizeComment() {
      commentInput.style.height = minCommentHeight + 'px';
      var nextHeight = Math.max(minCommentHeight, commentInput.scrollHeight);
      commentInput.style.height = nextHeight + 'px';
      if (commentParent) commentParent.style.height = nextHeight + 'px';
      if (commentClose) commentClose.style.top = Math.max(nextHeight - 58, 18) + 'px';
    }

    function openCommentEditor() {
      if (contactForm) contactForm.classList.add('comment-editing');
      resizeComment();
    }

    function closeCommentEditor() {
      commentInput.blur();
      commentInput.style.height = minCommentHeight + 'px';
      if (commentParent) commentParent.style.height = minCommentHeight + 'px';
      if (commentClose) commentClose.style.top = '';
      if (contactForm) contactForm.classList.remove('comment-editing');
    }

    commentInput.addEventListener('focus', openCommentEditor);
    commentInput.addEventListener('input', function () {
      if (!commentInput.value.trim()) {
        closeCommentEditor();
        return;
      }
      openCommentEditor();
    });
    if (commentClose) commentClose.addEventListener('click', closeCommentEditor);
    resizeComment();
  }

  /* в”Ђв”Ђ РџСѓР»СЊСЃР°С†РёСЏ РєРЅРѕРїРєРё В«РЎРњРћРўР Р•РўР¬ РљРђРўРђР›РћР“В» в”Ђв”Ђ */
  var catalogBtn = document.getElementById('hero-catalog-button');
  if (catalogBtn) {
    var pulse = true;
    setInterval(function () {
      var sh1 = catalogBtn.querySelector('.hero-catalog-button-outer-glow');
      if (!sh1) return;
      if (pulse) {
        sh1.style.transition = 'box-shadow 0.9s ease';
        sh1.style.boxShadow  = '0px 0px 60px 4px rgba(36,163,12,0.9)';
      } else {
        sh1.style.transition = 'box-shadow 0.9s ease';
        sh1.style.boxShadow  = '0px 0px 44px 0px rgba(36,163,12,1)';
      }
      pulse = !pulse;
    }, 1800);
  }

  var scrollContainer = document.querySelector('.scroll-container');
  if (scrollContainer) {
    var sectionIds = [
      'experience-section',
      'quality-section',
      'about-section',
      'about-title',
      'social-links-section',
      'team-title'
    ];
    var isSectionScrolling = false;

    function getSectionTops() {
      var maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      var tops = [0];
      var sectionOffset = 120;
      var containerRect = scrollContainer.getBoundingClientRect();

      sectionIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
          var rect = el.getBoundingClientRect();
          var top = rect.top - containerRect.top + scrollContainer.scrollTop;
          tops.push(Math.min(Math.max(top - sectionOffset, 0), maxScroll));
        }
      });

      return tops;
    }

    function getCurrentSectionIndex(tops) {
      var currentTop = scrollContainer.scrollTop;
      var currentIndex = 0;
      var shortestDistance = Infinity;

      tops.forEach(function (top, i) {
        var distance = Math.abs(currentTop - top);
        if (distance < shortestDistance) {
          shortestDistance = distance;
          currentIndex = i;
        }
      });

      return Math.max(0, Math.min(tops.length - 1, currentIndex));
    }

    scrollContainer.addEventListener('wheel', function (event) {
      if (event.ctrlKey || isSectionScrolling) return;

      var direction = event.deltaY > 0 ? 1 : -1;
      if (direction === 0) return;

      var tops = getSectionTops();
      var currentIndex = getCurrentSectionIndex(tops);
      var nextIndex = Math.max(0, Math.min(tops.length - 1, currentIndex + direction));

      if (nextIndex === currentIndex) return;

      event.preventDefault();
      isSectionScrolling = true;
      scrollContainer.scrollTo({
        top: tops[nextIndex],
        behavior: 'smooth'
      });

      setTimeout(function () {
        isSectionScrolling = false;
      }, 850);
    }, { passive: false });
  }

});

/* в”Ђв”Ђ CSS @keyframes shake (РґРѕР±Р°РІР»СЏРµРј РїСЂРѕРіСЂР°РјРјРЅРѕ) в”Ђв”Ђ */
(function () {
  var style = document.createElement('style');
  style.textContent = [
    '@keyframes shake {',
    '  0%,100%{transform:translateX(0)}',
    '  20%{transform:translateX(-8px)}',
    '  40%{transform:translateX(8px)}',
    '  60%{transform:translateX(-5px)}',
    '  80%{transform:translateX(5px)}',
    '}'
  ].join('');
  document.head.appendChild(style);
})();






