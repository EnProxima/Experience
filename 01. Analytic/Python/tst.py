from icecream import ic
ic.configureOutput(includeContext=True,argToStringFunction=str)
#ic.disable()
printd=ic

def testNamedArgsArray(**kargs):
   printd (kargs)
   return 1

def testNamedArg (a,b,*,sep):
   printd (sep)
   return

def summ(*args):
    printd( list(map(type,args)))
    isNum=True
    
    for item in list(map(type,args)):
      if item is str: isNum=False
    if isNum==True:
       res=0
       for item in args:
          res=res+item
    else:
        res=''
        for item in args:
          res=res+str(item)
          
    return res

printd (summ(1,2,3,4,5))

testNamedArgsArray (a=1, b=2, c=4)
testNamedArg(1,2,sep=4)


print ('-classes---')
class Test:
   a=1
   b=4
   def summa(self,a):
      return self.a +self.b+a

test = Test()
print(test.summa(5))

class Test2(Test):
     def difference(self,a):
      return self.a +self.b-a 
     def summa(self,a):
      return self.a +self.b-a*a
     
test3=Test2()
print (test3.difference(4))







