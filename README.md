Otwórz project backend:
    1: Wejdź do pliku main/resources/application.properties
    2: Zmień zmienne w zależności od sposobu łączenia do bazy danych oraz nie zapomnij zmienić nazwy bazy danych
    3: Przejdź w konsoli do folderu /backend/avsystem
    4: Wpisz komendę "./mvnw spring-boot:run" 
    5: W razie zmiany domyślnego portu, zaleca się zmianę adresu w pliku ElevatorController.java w linijce 19

    !Springboot powinien automatycznie odpalić serwer tomcat, aby aplikacja zaczęła działać oraz przed uruchomieniem serwera należy uruchomić bazę danych z dobrymi danymi do połączenia z nią!

Otwórz project frontend:
    1: Przejdź w konsoli do foleru /frontend/elesystem
    2: Uruchom komendę npm install react-scripts --save
    3: Uruchom komendę npm start


    <!-- Algorytm wysyłania wind -->

    Wysyłka w środku windy:

    Winda jest wysyłana w kierunku pierwszego naciśniętego przycisku.
    Winda przyjmuje wszystkie pozostałe poziomy do swojej kolejki.
    Winda zatrzymuje się na poziomach idących w kierunku wcześniej ustalonym
    Po dotarciu do końca trasy, winda zamienia kierunek i rusza z powrotem w kolejności, albo oczekuje na jej wezwanie

    Wysyłka z piętra:

    (Winda na aktualnym piętrze i jadące na aktualne pietro nie są liczone)

    1: Szukana jest winda idąca w odpowiednim kierunku (aby nie jechać dwa razy przez to samo piętro)
    2: Szukana jest winda z najmniejszą kolejką
    3: Szukana jest winda, która jest najbliżej

    Zawsze zostanie wysłana jakaś winda, chyba że wszystkie są już zaplanowane do dotarcia na to piętro