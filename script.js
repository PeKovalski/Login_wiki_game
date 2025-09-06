document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();

        const username = document.getElementById('username').value.trim();
          const password = document.getElementById('password').value.trim();
            const messageEl = document.getElementById('login-message');

              if(username === 'antonio' && password === 'bonitao') {
                  messageEl.style.color = 'lightgreen';
                      messageEl.innerText = 'Login realizado com sucesso!';

                          // Esconde tela de login e mostra o site
                              document.getElementById('login-container').style.display = 'none';
                                  document.getElementById('site-content').style.display = 'block';
                                    } else {
                                        messageEl.style.color = 'red';
                                            messageEl.innerText = 'Usuário ou senha incorretos.';
                                              }
                                              });
})
