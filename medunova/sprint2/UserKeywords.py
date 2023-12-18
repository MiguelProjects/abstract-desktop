def parse_user_input(input):
    parse = input.split()
    for word in parse:
        if search(word):
            print("found")
    
def search(word):
    file_keywords = open("keywords.txt", "r")
    for line in file_keywords:
        if line.rstrip() == word:
            return True
    return False
