The following data was collected 2015 - 2018 using an online RIASEC / Holland Code test that internet users would visit to obtain personalized results.

It had one page with the 48 items used to calculate the RIASEC scales, on a second page takers were asked if they would be willing to complete an additional research survey. This dataset contains all those who agreed to complete the optional research survey. The only ommissions are that people who entered an age < 13 were dropped, so this data may require significant cleaning

The following items were rated on a 1-5 scale of how much they would like to perform that task, with the labels 1=Dislike, 3=Neutral, 5=Enjoy.

R1	Test the quality of parts before shipment
R2	Lay brick or tile
R3	Work on an offshore oil-drilling rig
R4	Assemble electronic parts
R5	Operate a grinding machine in a factory
R6	Fix a broken faucet
R7	Assemble products in a factory
R8	Install flooring in houses
I1	Study the structure of the human body
I2	Study animal behavior
I3	Do research on plants or animals
I4	Develop a new medical treatment or procedure
I5	Conduct biological research
I6	Study whales and other types of marine life
I7	Work in a biology lab
I8	Make a map of the bottom of an ocean
A1	Conduct a musical choir
A2	Direct a play
A3	Design artwork for magazines
A4	Write a song
A5	Write books or plays
A6	Play a musical instrument
A7	Perform stunts for a movie or television show
A8	Design sets for plays
S1	Give career guidance to people
S2	Do volunteer work at a non-profit organization
S3	Help people who have problems with drugs or alcohol
S4	Teach an individual an exercise routine
S5	Help people with family-related problems
S6	Supervise the activities of children at a camp
S7	Teach children how to read
S8	Help elderly people with their daily activities
E1	Sell restaurant franchises to individuals
E2	Sell merchandise at a department store
E3	Manage the operations of a hotel
E4	Operate a beauty salon or barber shop
E5	Manage a department within a large company
E6	Manage a clothing store
E7	Sell houses
E8	Run a toy store
C1	Generate the monthly payroll checks for an office
C2	Inventory supplies using a hand-held computer
C3	Use a computer program to generate customer bills
C4	Maintain employee records
C5	Compute and record statistical and other numerical data
C6	Operate a calculator
C7	Handle customers' bank transactions
C8	Keep shipping and receiving records

These other durations were recorded (measured on the server side):

introelapse		The time spent on the introduction/landing page (in seconds)
testelapse		The time spent on all the RIASEC questions (should be equivalent to the time elapsed on all the indiviudal questions combined)
surveyelapse		The time spent answering the supplemental demographic survey

On the next page was a generic demographics survey with many different questions.

The Ten Item Personality Inventory was administered (see Gosling, S. D., Rentfrow, P. J., & Swann, W. B., Jr. (2003). A Very Brief Measure of the Big Five Personality Domains. Journal of Research in Personality, 37, 504-528.):

TIPI1	Extraverted, enthusiastic.
TIPI2	Critical, quarrelsome.
TIPI3	Dependable, self-disciplined.
TIPI4	Anxious, easily upset.
TIPI5	Open to new experiences, complex.
TIPI6	Reserved, quiet.
TIPI7	Sympathetic, warm.
TIPI8	Disorganized, careless.
TIPI9	Calm, emotionally stable.
TIPI10	Conventional, uncreative.

The TIPI items were rated "I see myself as:" _____ such that

1 = Disagree strongly
2 = Disagree moderately
3 = Disagree a little
4 = Neither agree nor disagree
5 = Agree a little
6 = Agree moderately
7 = Agree strongly



The following items were presented as a check-list and subjects were instructed "In the grid below, check all the words whose definitions you are sure you know":

VCL1	boat
VCL2	incoherent
VCL3	pallid
VCL4	robot
VCL5	audible
VCL6	cuivocal
VCL7	paucity
VCL8	epistemology
VCL9	florted
VCL10	decide
VCL11	pastiche
VCL12	verdid
VCL13	abysmal
VCL14	lucid
VCL15	betray
VCL16	funny

A value of 1 is checked, 0 means unchecked. The words at VCL6, VCL9, and VCL12 are not real words and can be used as a validity check.

A bunch more questions were then asked:


education			"How much education have you completed?", 1=Less than high school, 2=High school, 3=University degree, 4=Graduate degree
urban				"What type of area did you live when you were a child?", 1=Rural (country side), 2=Suburban, 3=Urban (town, city)
gender				"What is your gender?", 1=Male, 2=Female, 3=Other
engnat				"Is English your native language?", 1=Yes, 2=No
age					"How many years old are you?"
hand				"What hand do you use to write with?", 1=Right, 2=Left, 3=Both
religion			"What is your religion?", 1=Agnostic, 2=Atheist, 3=Buddhist, 4=Christian (Catholic), 5=Christian (Mormon), 6=Christian (Protestant), 7=Christian (Other), 8=Hindu, 9=Jewish, 10=Muslim, 11=Sikh, 12=Other
orientation			"What is your sexual orientation?", 1=Heterosexual, 2=Bisexual, 3=Homosexual, 4=Asexual, 5=Other
race				"What is your race?", 1=Asian, 2=Arab, 3=Black, 4=Indigenous Australian / Native American / White, 5=Other (There was a coding error in the survey, and three different options were given the same value)
voted				"Have you voted in a national election in the past year?", 1=Yes, 2=No
married				"What is your marital status?", 1=Never married, 2=Currently married, 3=Previously married
familysize			"Including you, how many children did your mother have?"		
major				"If you attended a university, what was your major (e.g. "psychology", "English", "civil engineering")?"


These values were also calculated for technical information:

uniqueNetworkLocation	1 if the record is the only one from its network location in the dataset, 2 if there are more than one record. There can be more than one record from the same network if for example that network is shared by a school etc, or it may be because of test retakes
country	The country of the network the user connected from
source	1=from Google, 2=from an internal link on the website, 0=from any other website or could not be determined
