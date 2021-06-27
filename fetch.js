const formData = new FormData();
formData.append(
    'email',
    document.querySelector('input[name="email"]').value
)

fetch("{getform-endpoint}",
    {
        method: "POST",
        body: formData,
    }).then(r => console.log("Success"))