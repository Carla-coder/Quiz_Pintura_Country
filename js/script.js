import questions from './questions.js'

document.addEventListener('DOMContentLoaded', function () {
  const questionElement = document.querySelector('.question')
  const answersElement = document.querySelector('.answers')
  const spnQtd = document.querySelector('.spnQtd')
  const textFinish = document.querySelector('.finish span')
  const content = document.querySelector('.content')
  const contentFinish = document.querySelector('.finish')
  const btnRestart = document.querySelector('.finish button')

  let currentIndex = 0
  let questionsCorrect = 0

  btnRestart.onclick = () => {
    content.style.display = 'flex'
    contentFinish.style.display = 'none'
    currentIndex = 0
    questionsCorrect = 0
    loadQuestion()
  }

  function nextQuestion () {
    const selectedAnswer = document.querySelector(
      'input[name="answer"]:checked'
    )
    if (!selectedAnswer) {
      return // Não faz nada se nenhuma resposta for selecionada
    }

    const isCorrect = selectedAnswer.getAttribute('data-correct') === 'true'

    if (isCorrect) {
      questionsCorrect++
      selectedAnswer.parentNode.classList.add('correct')
    } else {
      selectedAnswer.parentNode.classList.add('incorrect')
    }

    // Desabilita todos os botões de resposta para evitar que o usuário responda novamente
    document.querySelectorAll('.answer').forEach(item => {
      item.disabled = true
    })

    // Aguarda um curto período antes de carregar a próxima pergunta
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        currentIndex++
        loadQuestion()
      } else {
        finish()
      }
    }, 1000)
  }

  function finish () {
    textFinish.innerHTML = `Você Acertou ${questionsCorrect} de ${questions.length} questões`
    content.style.display = 'none'
    contentFinish.style.display = 'flex'
  }

  function loadQuestion () {
    spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`
    const item = questions[currentIndex]
    questionElement.textContent = item.question
    answersElement.innerHTML = ''

    item.answers.forEach((answer, index) => {
      const div = document.createElement('div')

      const input = document.createElement('input')
      input.type = 'radio'
      input.id = `answer_${index}`
      input.name = 'answer'
      input.classList.add('answer')
      input.setAttribute('data-correct', answer.correct)

      const label = document.createElement('label')
      label.setAttribute('for', `answer_${index}`)
      label.textContent = answer.text

      div.appendChild(input)
      div.appendChild(label)

      answersElement.appendChild(div)
    })

    const nextButton = document.createElement('button')
    nextButton.textContent = 'Próximo'
    nextButton.classList.add('next')
    answersElement.appendChild(nextButton)

    nextButton.addEventListener('click', nextQuestion)
  }

  loadQuestion()
})
